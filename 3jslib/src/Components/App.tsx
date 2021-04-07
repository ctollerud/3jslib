import React from 'react';
import './App.css';
import ThreeCanvas from './ThreeCanvas'
import * as proj  from '../Gallery/shaderExplorations'

class App extends React.Component
{

  public constructor( props:any ){
    super( props );
    //this.init3js()
  }

  render(){
    return (
      <div className="App">
        <ThreeCanvas project={proj.default}/>
      </div>
    );
  }
}

export default App;
