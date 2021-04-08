import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three';
import { ThreeProject } from '../ThreeTools/ThreeProject';
import ExportCanvasForm from './ExportCanvasForm'
import CanvasExport from './CanvasExport'


type BasicCamera =  THREE.PerspectiveCamera | THREE.OrthographicCamera;

type CanvasArgs = {
    project:ThreeProject
};

export default function ThreeCanvas2( props:CanvasArgs ) {

    const canvasRef = useRef<HTMLCanvasElement>( null );
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>( null );

    const [camera, setCamera] = useState<BasicCamera | null>( null );
    const [scene, setScene] = useState<THREE.Scene | null>( null );
    const [aspectRatio, setAspectRatio] = useState<number | null>( null );

    const initializationEffect = renderer ? () => {} : () => {
        const canvas = canvasRef.current


        //theoretically, we should always have a canvas here.
        if( !canvas ) return;
        
        const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer:true, antialias: true, canvas:canvas });
        
        canvas.style.width = '100%'
        
        const initialWidth = canvas.clientWidth;
            
        const calculatedHeight = (initialWidth/props.project.aspectRatio);
        console.log( canvas.clientWidth, calculatedHeight )
        canvas.style.height = String(100);



        renderer.setSize( canvas.clientWidth, calculatedHeight, false );

        const [ camera, scene ] = props.project.render( renderer );
        setRenderer( renderer );
        setScene( scene );
        setCamera( camera );
        setAspectRatio( props.project.aspectRatio )

    }

    //we can't include a CanvasExportComponent until this component has been mounted.
    const CanvasExportComponent = camera && renderer && aspectRatio && scene ? <CanvasExport camera={camera} scene={scene} renderer={renderer} aspectRatio={aspectRatio} /> : <></>

    useEffect( initializationEffect );

    return (
        <div className="ThreeCanvas">
            <div className="ThreeCanvas.CanvasHolder" >
                <canvas ref={canvasRef} />
            </div>
            {CanvasExportComponent}
        </div>
    );
}
