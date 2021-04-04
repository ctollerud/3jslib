import { Console } from 'node:console';
import { runInContext } from 'node:vm';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Action, Action2, Func0 } from '../Utils/functions';


type FixedWidthAndHeight = { width:number, height:number }
type FixedWidthAndAspectRatio = { width:number, aspectRatio:number }
type FixedHeightAndAspectRatio = { width:number, aspectRatio:number }

type FixedSize = FixedWidthAndHeight | FixedWidthAndAspectRatio | FixedHeightAndAspectRatio;
type AspectRatio = { aspectRatio:number };

type ThreeProjectSize = FixedSize | AspectRatio


type ThreeProjectAction = Action<THREE.WebGLRenderer>;
type ThreeSnapshot<TState> = {
  scene:THREE.Scene,
  camera:THREE.PerspectiveCamera,
  state:TState
};
type ThreeProjectBuilderFunction<TState> = ( renderer:THREE.WebGLRenderer ) => ThreeSnapshot<TState>



class ThreeProject {
  public constructor( private action:ThreeProjectAction, public projectSize:ThreeProjectSize | undefined = undefined ){}

  public render:( ( renderer:THREE.WebGLRenderer )=>void) = (x) => this.action( x )

  static initialize<TState>( func:Func0<ThreeSnapshot<TState>> ):ThreeProjectBuilder<TState> {
    return ThreeProjectBuilder.initialize<TState>(func);
  }

}

class ThreeProjectBuilder<TState> {
  private constructor( private func:ThreeProjectBuilderFunction<TState> ) {}

  build( projectSize:ThreeProjectSize | undefined = undefined ):ThreeProject {
    return new ThreeProject( x => this.func(x), projectSize )
  }

  static initialize<TState>( func:Func0<ThreeSnapshot<TState>> ) {
    return new ThreeProjectBuilder<TState>( (x) => func() );
  }

  //Handle the canvas resizing by rejiggering the renderer.
  //Is a little janky, as it uses the window resize event as a bludgeon.
  handleCanvasResizing( additionalAction:Action2<TState,{ width:number, height:number }> | undefined = undefined ) {
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

  animate( action:Action2<TState,number> | undefined = undefined ) {
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

  includeOrbitControls( setup:Action<OrbitControls> | undefined = undefined ) {

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

export type { ThreeProject };