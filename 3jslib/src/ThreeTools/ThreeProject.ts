import { Console } from 'node:console';
import { runInContext } from 'node:vm';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//import { Action1, Action2, Func0 } from '../Utils/functions';
import * as Functions from '../Utils/functions';

type BasicCamera = THREE.PerspectiveCamera | THREE.OrthographicCamera;


type ThreeProjectAction = Functions.Func1<THREE.WebGLRenderer,[BasicCamera,THREE.Scene]>;
type ThreeSnapshot<TState> = {
  scene:THREE.Scene,
  camera:THREE.PerspectiveCamera,
  state:TState
};
type ThreeProjectBuilderFunction<TState> = ( renderer:THREE.WebGLRenderer ) => ThreeSnapshot<TState>



class ThreeProject {
  public constructor( private action:ThreeProjectAction, public aspectRatio:number ){}

  public render:( ( renderer:THREE.WebGLRenderer )=>[BasicCamera,THREE.Scene]) = (x) => this.action( x )

  static initialize<TState>( func:Functions.Func0<ThreeSnapshot<TState>> ):ThreeProjectBuilder<TState> {
    return ThreeProjectBuilder.initialize<TState>(func);
  }

}

class ThreeProjectBuilder<TState> {
  private constructor( private func:ThreeProjectBuilderFunction<TState> ) {}

  buildWithAspectRatio( aspectRatio:number ):ThreeProject {
    return new ThreeProject( x => 
      {
        const snapshot = this.func(x);
        return [ snapshot.camera, snapshot.scene ];
      }, aspectRatio )
  }

  static initialize<TState>( func:Functions.Func0<ThreeSnapshot<TState>> ) {
    return new ThreeProjectBuilder<TState>( (x) => func() );
  }

  //Handle the canvas resizing by rejiggering the renderer.
  //Is a little janky, as it uses the window resize event as a bludgeon.
  handleCanvasResizing( additionalAction:Functions.Action2<TState,{ width:number, height:number }> | undefined = undefined ) {
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

        if( additionalAction ) additionalAction( snapshot.state, { width:renderer.domElement.width, height:renderer.domElement.height } )

        renderer.render( snapshot.scene, snapshot.camera );
      };
      window.addEventListener( 'resize', handleResizing );
      handleResizing();

      return snapshot;

    });
  }

  animate( action:Functions.Action2<TState,number> | undefined = undefined ) {
    return new ThreeProjectBuilder<TState>( (renderer) => {
      const snapshot = this.func(renderer);
      const animate = function (t:number) {
        requestAnimationFrame( animate );
        if ( action ) action(snapshot.state,t);
  
        renderer.render( snapshot.scene, snapshot.camera );
      };
      animate(0);

      return snapshot;

    } )
  }

  includeOrbitControls( setup:Functions.Action1<OrbitControls> | undefined = undefined ) {

    return new ThreeProjectBuilder<TState>( (renderer) => {
      const snapshot = this.func(renderer);
      const controls = new OrbitControls( snapshot.camera, renderer.domElement )
      if( setup ) setup( controls )

      return snapshot

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

export { ThreeProject };