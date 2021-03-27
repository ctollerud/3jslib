import React from 'react';
import './App.css';
import * as THREE from 'three'


// function AppOld() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component
{

  public constructor( props:any ){
    super( props );
    //this.init3js()
  }

  private canvasHolder:(HTMLDivElement | null) = null;

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <button className="App-renderButton" onClick={this.click} >save</button>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div ref={ref => this.canvasHolder = ref} ></div>
      </div>
    );
  }

  private init3js() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    this.canvasHolder?.appendChild( renderer.domElement );
    //document.body.appendChild( renderer.domElement );

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

  private click(){
    console.log( 'clicked' );
  }

  componentDidMount(){
    this.init3js();
  }
}

export default App;
