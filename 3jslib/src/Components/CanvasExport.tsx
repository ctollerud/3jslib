import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import ExportCanvasForm from './ExportCanvasForm'

type BasicCamera = THREE.PerspectiveCamera | THREE.OrthographicCamera;

type props = {
    camera: BasicCamera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    aspectRatio: number

}

const triggerDownload = (imgURI:string) => {
    const evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    const a = document.createElement('a');
    a.setAttribute('download', 'ImageDl.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
}

const saveToPng = ( canvas:HTMLCanvasElement ) => {
    var imgURI = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
}

const renderPng = ( renderer:THREE.WebGLRenderer, scene:THREE.Scene, camera:BasicCamera, width:number, height:number ) => {
    const tempCamera = camera.clone() as BasicCamera;
    renderer.setSize( width, height, true );
    tempCamera.updateProjectionMatrix();
    renderer.render( scene, tempCamera );

    saveToPng( renderer.domElement );

}


export default function CanvasExport( props:props ) {

    const [renderer, setRenderer] = useState<THREE.WebGLRenderer|null>( null )
    const canvasRef = useRef<HTMLCanvasElement>( null )

    useEffect( () => {
        if( !renderer && canvasRef.current ){
            setRenderer( new THREE.WebGLRenderer( { preserveDrawingBuffer:true, antialias: true, canvas:canvasRef.current } ) )
        }

        return () => renderer?.dispose();
    } )

    return (
        <div>
            My aspect ratio is {props.aspectRatio}
            <ExportCanvasForm render={ dimensions => {

                console.log( `render a ${dimensions.width}X${dimensions.height} diagram...` );

                if( !renderer ) return;
                const canvas = canvasRef.current;
                if( !canvas ) return;

                renderPng( renderer, props.scene, props.camera, dimensions.width, dimensions.height );
                
                } } />
                <canvas ref={canvasRef} />
        </div>
    )
}
