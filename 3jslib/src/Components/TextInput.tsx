import React, { useState } from 'react'
import * as F from '../Utils/functions'


// interface requiredProps = {

// }

type props = {
    value:string,
    textChanged?:F.Action1<string>
}

export default function TextInput( props:props ) {
    const [ text, setText ] = useState( props.value )

    const textChanged = (text:string) => {
        setText( text );
        if( props.textChanged ) props.textChanged( text );
    } 

    return (
        <input type="text" value={text} onChange={ (e) => textChanged(e.target.value) } />
    )
}
