import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextInput from './TextInput'
import { Action1, Action2 } from '../Utils/functions'

//const action = functions.Action1


type propsType = {
    render:Action1<{ width:number, height:number }>
};

function ExportCanvasForm( props:propsType ) {
    const [ widthText, setWidthText ] = useState( '' );
    const [ heightText, setHeightText ] = useState( '' );

    return (
        <> 
            <div>
                <strong>Export</strong>
                <div>Width: <TextInput value={ widthText } textChanged={ setWidthText } /></div>
                <div>Height: <TextInput value={ heightText } textChanged={ setHeightText } /></div>
                {/* <div>Width: <input type="text" value={ input1Text } onChange={ (e) => setText( e.target.value ) } /></div> */}
                {/* <div>Height: <input type="text" value={ input2Text } onChange={ (e) => setText2( e.target.value ) } /></div> */}
                <div><button onClick={ () => props.render({ width:Number(widthText), height:Number(heightText) }) } >Save</button></div>
            </div>
        </>
    )
}

ExportCanvasForm.propTypes = {

}

export default ExportCanvasForm

