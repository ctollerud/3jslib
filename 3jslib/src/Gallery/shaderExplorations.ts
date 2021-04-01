import * as THREE from "three";
import { ThreeProject } from "../ThreeTools/ThreeProject";

import * as  vertexShader from './vertexShader.glsl'
import * as fragmentShader from './fragmentShader.glsl'


console.log(vertexShader.default);
console.log(fragmentShader.default);

const project = 
    ThreeProject.initialize( () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const geometry = new THREE.BoxGeometry();
    //const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

    const material = new THREE.ShaderMaterial({
        fragmentShader: fragmentShader.default,
        vertexShader: vertexShader.default,
    })

    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    return {scene:scene, camera:camera, state:cube};
} )
.animate( (cube,t) => {
    cube.rotation.x +=0.01;
    cube.rotation.y +=0.01;
  } )

export default project;