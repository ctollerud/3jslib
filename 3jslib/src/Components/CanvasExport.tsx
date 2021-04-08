import React from 'react'
import * as THREE from 'three'

type BasicCamera = THREE.PerspectiveCamera | THREE.OrthographicCamera;

type props = {
    camera: BasicCamera
    renderer: THREE.WebGLRenderer
    aspectRatio: number

}

export default function CanvasExport( props:props ) {
    return (
        <div>
            My aspect ratio is {props.aspectRatio}
        </div>
    )
}
