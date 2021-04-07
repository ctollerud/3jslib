import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Action1, Action2 } from '../Utils/functions'

//const action = functions.Action1


type propsType = {
    render:Action1<{ width:number, height:number }>
};

function ExportCanvasForm( props:propsType ) {
    const [ input1Text, setText ] = useState( '' );
    const [ input2Text, setText2 ] = useState( '' );

    return (
        <> 
            TODO: update the hook using the inputs
            <div>Width: <input type="text" value={ input1Text } onChange={ (e) => setText( e.target.value ) } /></div>
            <div>Height: <input type="text" value={ input2Text } onChange={ (e) => setText2( e.target.value ) } /></div>
            <button onClick={ () => props.render({ width:Number(input1Text), height:Number(input2Text) }) } >Save</button>
        </>
    )
}

ExportCanvasForm.propTypes = {

}

export default ExportCanvasForm

