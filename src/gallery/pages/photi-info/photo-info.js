import React, {useEffect} from 'react';
import './photo-info.scss'
import PhotoButtons from '../../components/photo-buttons/photo-buttons';
import {server} from '../../../server/server';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect, Switch} from 'react-router-dom';
import Loader from '../../components/loader/loader';
import {getGallery, getPhotoIdPage} from '../../../redux/actions/actions';

function PhotoInfo() {
    const dispatch = useDispatch()
    const photo = useSelector(state => state.photos.photo)
    const loader = useSelector(state => state.system.loading)
    const href = (window.location.href).split('/');
    const id = href[href.length - 1]
    useEffect(() => {
        dispatch(getPhotoIdPage(id))
    }, [])

    return (
        <>
            {loader && <Loader top={document.documentElement.scrollTop}/>}
            <div className={'photo-parameters photo-parameters_style'}>
                <div className={'photo-parameters__wrapper photo-parameters__wrapper_style'}>
                    <div className={'photo-parameters__img-container photo-parameters__img-container_style'}>
                        {
                            photo === null && !loader ? <div className={'photo-parameters__null photo-parameters__null-style'}>Нет изображения</div> :
                                <img className={'photo-parameters__img photo-parameters__img_style'} src={server + '/images/' + id + '.jpg'}/>
                        }
                        <div className={'photo-parameters__button_style'}>
                            <Link to='/gallery'><h1>Назад</h1></Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default PhotoInfo