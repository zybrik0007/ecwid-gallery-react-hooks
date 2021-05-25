import React from 'react'
import './photo-buttons.scss'

function PhotoButtons({param}) {
    return (
        <span className={param.classes} onClick={() => {param.func(param.idx)}}/>
    )
}
export default PhotoButtons