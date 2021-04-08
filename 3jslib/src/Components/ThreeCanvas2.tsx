import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three';
import { ThreeProject } from '../ThreeTools/ThreeProject';
import ExportCanvasForm from './ExportCanvasForm'
import CanvasExport from './CanvasExport'


type BasicCamera =  THREE.PerspectiveCamera | THREE.OrthographicCamera;

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


type CanvasArgs = {
    project:ThreeProject
};

export default function ThreeCanvas2( props:CanvasArgs ) {

    const canvasRef = useRef<HTMLCanvasElement>( null );
    const exportCanvasRef = useRef<HTMLCanvasElement>( null );
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>( null );

    const [camera, setCamera] = useState<BasicCamera | null>( null );
    const [scene, setScene] = useState<THREE.Scene | null>( null );
    const [exportRenderer, setExportRenderer] = useState<THREE.WebGLRenderer | null>( null );
    const [aspectRatio, setAspectRatio] = useState<number | null>( null );

    const initializationEffect = renderer ? () => {} : () => {
        const canvas = canvasRef.current


        //theoretically, we should always have a canvas here.
        if( !canvas ) return;
        
        const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer:true, antialias: true, canvas:canvas });
        
        //canvas.style.height = '100%'
        canvas.style.width = '100%'
        
        const initialWidth = canvas.clientWidth;
            
        const calculatedHeight = (initialWidth/props.project.aspectRatio);
        

        console.log( canvas.clientWidth, calculatedHeight )
        //renderer.setSize( canvas.clientWidth, calculatedHeight ?? canvas.clientHeight, false );
        canvas.style.height = String(100);



        renderer.setSize( canvas.clientWidth, calculatedHeight, false );

        const [ camera, scene ] = props.project.render( renderer );
        setRenderer( renderer );
        setScene( scene );
        setCamera( camera );
        setAspectRatio( props.project.aspectRatio )

    }

    const CanvasExportComponent = camera && renderer && aspectRatio ? <CanvasExport camera={camera} renderer={renderer} aspectRatio={aspectRatio} /> : <></>

    useEffect( initializationEffect );

    return (
        <div className="ThreeCanvas">
            <ExportCanvasForm render={ dimensions => {
                console.log( `render a ${dimensions.width}X${dimensions.height} diagram...` );
                const canvas = exportCanvasRef.current;
                if( !canvas || !scene || !camera ) return;
                let renderer = exportRenderer;
                
                if( !renderer ) {
                    renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer:true, antialias: true, canvas:canvas } )
                    setExportRenderer( renderer );
                }

                renderPng( renderer, scene, camera, dimensions.width, dimensions.height );
                
                } } />
            <button onClick={() =>saveToPng}>Save to PNG</button>
            <div className="ThreeCanvas.CanvasHolder" >
                <canvas ref={canvasRef} />
                <canvas ref={exportCanvasRef} />
            </div>
            {CanvasExportComponent}
        </div>
    );
}
