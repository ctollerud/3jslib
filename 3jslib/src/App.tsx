import React from 'react';
import './App.css';
import ThreeCanvas from './ThreeCanvas'
import * as proj  from './Gallery/shaderExplorations'



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
        <ThreeCanvas project={proj.default.handleCanvasResizing().build()}/>
      </div>
    );
  }

  private click(){
    console.log( 'clicked' );
  }
}

export default App;
