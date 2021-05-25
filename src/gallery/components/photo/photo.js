import React from 'react'
import './photo.scss'
import PhotoButtons from '../photo-buttons/photo-buttons';
import {server} from '../../../server/server'
import {useDispatch} from 'react-redux';
import {deletePhoto, getGallery} from '../../../redux/actions/actions';
import {Link} from 'react-router-dom';


function Photo({photo}) {
    const dispatch  = useDispatch()

    return (
        <div
            className={'photo photo_style'}
            data-width={photo.width}
            data-height={photo.height}
            data-id={photo.id}>
            <div className={'photo__info photo__info_style'}>
                <div className={'photo__info-wrapper photo__info-wrapper_style'}>
                    <span className={'photo__info-id photo__info-id_style'}>ID: {photo.id}</span>
                    <div className={'photo__info-buttons photo__info-buttons_style'}>
                        <div className={'photo__button-zoom-plus photo__button-zoom-plus_style'}>
                            <Link to={'/photo/' + photo.id}>
                                <PhotoButtons param={{classes: 'icon-zoom-in', idx: photo.id, func: () => {}}}/>
                            </Link>
                        </div>
                        <div className={'photo__button-delete photo__button-delete_style'}>
                            <PhotoButtons param={{classes: 'icon-cross', idx: photo.id, func: (event) => {
                                dispatch(deletePhoto(event))
                            }}}/>
                        </div>
                    </div>
                </div>
            </div>
            <img
                className={'photo__img photo__img_style'}
                src={server + '/images/' + photo.id + '.jpg'}/>
        </div>
    )
}

export default Photo