import { Console } from 'node:console';
import * as THREE from 'three'
import { Action, Func } from '../Utils/functions';

type ThreeProject = Action<THREE.WebGLRenderer>;
type ThreeStaticProject = Func<[THREE.Scene,THREE.Camera]>

namespace ThreeProjectFactory {
  export const Static:(staticProject:ThreeStaticProject) => ThreeProject = (staticProject) => (renderer:THREE.WebGLRenderer) => {
    const [ scene, camera ] = staticProject();
    renderer.render(scene,camera);
  }
}

const helloWorldCube = ThreeProjectFactory.Static( () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;
  return [scene, camera];
} )

const RotatingSquarePOC:ThreeProject = renderer => {
    //renderer.setSize( window.innerWidth, window.innerHeight );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    const animate = function (t:number) {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    const canvas = renderer.domElement;
/////////
    function resizeRendererToDisplaySize() {
      const canvas = renderer.domElement;
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
      camera.aspect = renderer.domElement.width / renderer.domElement.height;
      camera.updateProjectionMatrix();
      console.log('resizing');
      resizeRendererToDisplaySize();
    };
    window.addEventListener( 'resize', handleResizing );
    handleResizing();

    animate(0);
}


export { RotatingSquarePOC, helloWorldCube  };