import React from 'react';
import * as THREE from 'three'
import './ThreeCanvas.css';

export default class ThreeCanvas extends React.Component{


    private canvasHolder:(HTMLDivElement | null) = null;
    private canvasElement:( HTMLCanvasElement | null ) = null;

    render(){

        return (
            <div>
                <button onClick={this.saveToPng.bind(this)}>Save to PNG</button>
                <div ref={ref => this.canvasHolder = ref} />
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
        this.canvasHolder?.appendChild( renderer.domElement );
        this.canvasElement = renderer.domElement;

        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.domElement.classList.add( 'ThreeCanvas-canvas' );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
    
        camera.position.z = 5;
    
        const animate = function () {
          requestAnimationFrame( animate );
    
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
    
          renderer.render( scene, camera );
        };
    
        animate();
      }

}