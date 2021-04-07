import React from 'react';
import * as THREE from 'three'
import './ThreeCanvas.css';
import { Action1 } from '../Utils/functions';
import { ThreeProject } from '../ThreeTools/ThreeProject'
import ExportCanvasForm from './ExportCanvasForm'

type Dimensions = { width:number, height:number }


type CanvasArgs = {
    project:ThreeProject
}

export default class ThreeCanvas extends React.Component<CanvasArgs>{


    private canvasHolder:(HTMLDivElement | null) = null;
    private canvasElement:( HTMLCanvasElement | null ) = null;

    render(){

        return (
            <div className="ThreeCanvas">
                <ExportCanvasForm render={ dimensions => console.log( `render a ${dimensions.width}X${dimensions.height} diagram...` ) } />
                <button onClick={this.saveToPng.bind(this)}>Save to PNG</button>
                <div className="ThreeCanvas.CanvasHolder" ref={ref => this.canvasHolder = ref} />

                Some other text
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

        const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer:true, antialias: true });
        const canvas = renderer.domElement;

        const aspectRatio = this.props.project.aspectRatio;

        //if( canvas )
        canvas.style.height = '100%'
        canvas.style.width = '100%'
        this.canvasHolder?.appendChild( canvas );

        const initialWidth = canvas.clientWidth;


        // let x:number = aspectRatio;
        // if( aspectRatio )
        // {
        //     const x = aspectRatio;
        // }

        const calculatedHeight = this.props.project.aspectRatio ? (initialWidth/this.props.project.aspectRatio) : undefined;

        renderer.setSize( canvas.clientWidth, calculatedHeight ?? canvas.clientHeight, false );
        //canvas = renderer.domElement;

        this.props.project.render( renderer );
        

      }

}