import React from 'react';
import { isFunctionOrConstructorTypeNode } from 'typescript';
import './App.css';
import ThreeCanvas from './ThreeCanvas'

import * as blah from './ThreeTools/functionBuilder'
import * as functionBuilder from './ThreeTools/functionBuilder'



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
        <ThreeCanvas project={functionBuilder.helloWorldCube}/>
      </div>
    );
  }

  private click(){
    console.log( 'clicked' );
  }
}

export default App;
