import { Console } from 'node:console';
import { runInContext } from 'node:vm';
import * as THREE from 'three'
import { Action, Action2, Func0 } from '../Utils/functions';

type ThreeProjectAction = Action<THREE.WebGLRenderer>;
type ThreeSnapshot<TState> = {
  scene:THREE.Scene,
  camera:THREE.PerspectiveCamera,
  state:TState
};
type ThreeProjectBuilderFunction<TState> = ( renderer:THREE.WebGLRenderer ) => ThreeSnapshot<TState>


type ThreeStaticProject = Func0<[THREE.Scene,THREE.Camera]>

class ThreeProject {
  public constructor( private action:ThreeProjectAction ){}

  public render:( ( renderer:THREE.WebGLRenderer )=>void) = (x) => this.action( x )

  static initialize<TState>( func:Func0<ThreeSnapshot<TState>> ):ThreeProjectBuilder<TState> {
    return ThreeProjectBuilder.initialize<TState>(func);
  }

}

class ThreeProjectBuilder<TState> {
  private constructor( private func:ThreeProjectBuilderFunction<TState> ) {}

  build():ThreeProject {
    return new ThreeProject( x => this.func(x) )
  }

  static initialize<TState>( func:Func0<ThreeSnapshot<TState>> ) {
    return new ThreeProjectBuilder<TState>( (x) => func() );
  }

  //Handle the canvas resizing by rejiggering the renderer.
  //Is a little janky, as it uses the window resize event as a bludgeon.
  handleCanvasResizing() {
    return new ThreeProjectBuilder<TState>((renderer) => {
      const snapshot = this.func(renderer);

      const canvas = renderer.domElement;

      function resizeRendererToDisplaySize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
  
      const handleResizing = () =>
      {
        snapshot.camera.aspect = renderer.domElement.width / renderer.domElement.height;
        snapshot.camera.updateProjectionMatrix();
        resizeRendererToDisplaySize();
        renderer.render( snapshot.scene, snapshot.camera );
      };
      window.addEventListener( 'resize', handleResizing );
      handleResizing();

      return snapshot;

    });
  }

  animate( action:Action2<TState,number> ) {
    return new ThreeProjectBuilder<TState>( (renderer) => {
      const snapshot = this.func(renderer);
      const animate = function (t:number) {
        requestAnimationFrame( animate );
        action(snapshot.state,t);
  
        renderer.render( snapshot.scene, snapshot.camera );
      };
      animate(0);

      return snapshot;

    } )
  }

  renderOnce() {
    return new ThreeProjectBuilder<TState>( (x) => {
      let snapshot = this.func(x);
      x.render(snapshot.scene, snapshot.camera)

      return snapshot;
    } )
  }
    
}

const helloWorldCube = ThreeProject.initialize( () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;
  return {scene:scene, camera:camera, state:cube};
} )
//.renderOnce()
// .animate((cube,t) => {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.03;
// })
.renderOnce()
.handleCanvasResizing()
.build();


export { ThreeProject, helloWorldCube  };