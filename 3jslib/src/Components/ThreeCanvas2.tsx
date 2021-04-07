import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three';
import { ThreeProject } from '../ThreeTools/ThreeProject';
import ExportCanvasForm from './ExportCanvasForm'


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

const saveToPng = ( canvas:HTMLCanvasElement | null ) => {

    if( !canvas ) return;

    var imgURI = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
}


type CanvasArgs = {
    project:ThreeProject
};

export default function ThreeCanvas2( props:CanvasArgs ) {

    const canvasRef = useRef<HTMLCanvasElement>( null );
    const canvasHolderRef = useRef<HTMLDivElement>( null );
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>( null )

    console.log( 'rendering...' );
    const initializationEffect = renderer ? () => {} : () => {
        const canvas = canvasRef.current
        const canvasHolder = canvasHolderRef.current;
        //theoretically, we should always have a canvas here.
        if( !canvas || !canvasHolder ) return;
        
        
        
        
        console.log( 'initializing...' );
        const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer:true, antialias: true, canvas:canvas });
        
        
        
        //renderer.domElement = canvas;
        //canvasHolder.appendChild( renderer.domElement );
        
        
        
        const aspectRatio = props.project.aspectRatio;
        
        canvas.style.height = '100%'
       canvas.style.width = '100%'

        // const ctx = canvas.getContext( '2d' );

        // if( !ctx )
        // {
        //     console.log(  "ctx is null!" );
        //     return;
        // }
        // ctx.fillStyle= "#FF0000";
        // ctx.fillRect( 1000,1000, 2000,2000 );
        // ctx.stroke();
        
        const initialWidth = canvas.clientWidth;
            
        const calculatedHeight = props.project.aspectRatio ? (initialWidth/props.project.aspectRatio) : undefined;
        

        console.log( canvas.clientWidth, calculatedHeight ?? canvas.clientHeight )
        //renderer.setSize( canvas.clientWidth, calculatedHeight ?? canvas.clientHeight, false );

        props.project.render( renderer );
        setRenderer( renderer );
        

        // TODO: hang onto the camera so it can be used with a separate renderer

    }

    useEffect( initializationEffect );

    return (
        <div className="ThreeCanvas">
            <ExportCanvasForm render={ dimensions => console.log( `render a ${dimensions.width}X${dimensions.height} diagram...` ) } />
            <button onClick={() =>saveToPng}>Save to PNG</button>
            <div className="ThreeCanvas.CanvasHolder" ref={canvasHolderRef} >
                <canvas ref={canvasRef} />
            </div>

            Some other text
        </div>
    );
}
