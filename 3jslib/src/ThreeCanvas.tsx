import React from 'react';
import * as THREE from 'three'
import './ThreeCanvas.css';
import { Action } from './Utils/functions';



type CanvasArgs = {
    RendererFunc:Action<THREE.WebGLRenderer>;
}

export default class ThreeCanvas extends React.Component<CanvasArgs>{


    private canvasHolder:(HTMLDivElement | null) = null;
    private canvasElement:( HTMLCanvasElement | null ) = null;

    render(){

        return (
            <div className="ThreeCanvas">
                <button onClick={this.saveToPng.bind(this)}>Save to PNG</button>
                <div className="ThreeCanvas.CanvasHolder" ref={ref => this.canvasHolder = ref} />
            </div>
        );
    }

    componentDidMount() {
        this.init3js();
    }

    private saveToPng() {
        let canvasElement = this.canvasElement;
        if( !canvasElement ){
            return
        }
        var imgURI = canvasElement
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

        this.triggerDownload(imgURI);
    }

    private triggerDownload(imgURI:string) {
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
    


    private init3js() {

        const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer:true });
        const canvas = renderer.domElement;
        //renderer.setSize( window.innerWidth, window.innerHeight );
        if( this.canvasHolder ) {
        }
        //renderer.setSize( this.canvasHolder?.offsetWidth || 0 + 200, this.canvasHolder?.offsetHeight || 0 + 200 )
        console.log( this.canvasHolder )
        //renderer.setSize( 300, 400 )
        canvas.style.height = '100%'
        canvas.style.width = '100%'
        this.canvasHolder?.appendChild( canvas );
        renderer.setSize( canvas.clientWidth, canvas.clientHeight, false );
        //canvas = renderer.domElement;

        this.props.RendererFunc( renderer );
        

      }

}