import * as THREE from "three";
import { ThreeProject } from "../ThreeTools/ThreeProject";


const helloWorldCube = ThreeProject.initialize( () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


  //const controls = new OrbitControls

  camera.position.z = 5;
  return {scene:scene, camera:camera, state:cube};
} )
.renderOnce()
.animate( (cube,t) => {
  cube.rotation.x +=0.01;
  cube.rotation.y +=0.01;
} )
.handleCanvasResizing()
.buildWithAspectRatio( 1 );

export {helloWorldCube};
