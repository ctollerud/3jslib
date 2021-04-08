import * as THREE from "three";
import { ThreeProject } from "../ThreeTools/ThreeProject";

import * as  vertexShader from './vertexShader.glsl'
import * as fragmentShader from './fragmentShader.glsl'


// console.log(vertexShader.default);
// console.log(fragmentShader.default);

const project = 
    ThreeProject.initialize( () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 1000 / 1000, 0.1, 1000 );
    const geometry = new THREE.PlaneBufferGeometry(1,1);
    //const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

    const uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
        fragmentShader: fragmentShader.default,
        vertexShader: vertexShader.default,
        uniforms : uniforms
    })

    const planeMesh = new THREE.Mesh( geometry, material );
    scene.add( planeMesh );
    
    camera.position.z = 1;

    const updateUniforms = () => {
        requestAnimationFrame( updateUniforms );
        uniforms.u_time.value += 0.05;
    }

    updateUniforms();

    //TODO: incorporate mouse-move as well?
    const handleResize = ( newX:number, newY:number ) => {
        uniforms.u_resolution.value.x = newX;
        uniforms.u_resolution.value.y = newY;
    }



    return {scene:scene, camera:camera, state:{ planeMesh, handleResize }};
} )
.includeOrbitControls()
.animate( (state,t) => {
     state.planeMesh.rotation.x +=0.01;
     state.planeMesh.rotation.y +=0.01;
  } )
.handleCanvasResizing( ( state, newDimensions ) => state.handleResize( newDimensions.width, newDimensions.height ) )
.buildWithAspectRatio( 2 )

export default project;