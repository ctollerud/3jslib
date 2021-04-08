import React from 'react';
import './App.css';
//import ThreeCanvas from './ThreeCanvas'
import ThreeCanvas2 from './ThreeCanvas2'
import * as proj  from '../Gallery/shaderExplorations'

class App extends React.Component
{

  public constructor( props:any ){
    super( props );
  }

  render(){
    return (
      <div className="App">
        <ThreeCanvas2 project={proj.default}/>
      </div>
    );
  }
}

export default App;
