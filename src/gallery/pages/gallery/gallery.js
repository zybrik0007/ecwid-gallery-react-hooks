import React, {useEffect} from 'react'
import './gallery.scss'
import Photo from '../../components/photo/photo';
import {useDispatch, useSelector} from 'react-redux';
import {getGallery, putJsonPhoto, getGalleryScroll, getCountPhotos, getPhotoId, putUrlPhoto} from '../../../redux/actions/actions';
import {sizeColumn} from './functions/functions';
import InputSelector from '../../components/input-selector/input-selector';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import Input from '../../components/input/input';

function Gallery() {
    const dispatch = useDispatch()
    const photos = useSelector(state => state.photos.photos)
    const count = useSelector(state => state.photos.countPhotos)
    const loader = useSelector(state => state.system.loading)
    const error = useSelector(state => state.system.error)
    const errorText = useSelector(state => state.system.errorText)


    const obj = {
        arrayInput: [
            {
                data_name: 'JSON',
                type: 'file',
                accept_file: '.json',
            },
            {
                data_name: 'URL',
                type: 'text',
                placeholder: 'URL Image',
                function_submit: (event) => {dispatch(putUrlPhoto(event))}
            }],
        ojbButtonSubmit: [{
            button_icon: 'icon-upload',
            data_name: 'JSON',
            function_submit: (event) => {dispatch(putJsonPhoto(event))}
        }],
        arrOption: ['URL', 'JSON']
    }

    useEffect(() => {
        dispatch(getGallery(50))
        dispatch(getCountPhotos())
    }, [])

    /*Размер картинок*/
    useEffect(() => {
        if (photos && photos.length > 1 && !loader) {
            sizeColumn(photos, window.outerWidth, '.photo');
        }
        window.addEventListener('resize', () => {
            if (photos.length > 1) {
                sizeColumn(photos, window.outerWidth, '.photo');
            }
        })
    })


    /*Скроллинг и подгрузка изображений*/
    window.onscroll = async function () {
        console.log('lenght: ', photos.length)
        console.log('count: ', count)
        if (photos && photos.length < count) {

            const scrollLab = document.documentElement.scrollHeight - window.innerHeight
            if(Math.ceil(scrollLab) === Math.ceil(window.scrollY)) {
                dispatch(getGalleryScroll(photos.length + 50))
            }
        }
    }

    return(
        <>
            <div className={'gallery-input-area gallery-input-area_style'}>
                <div className={'gallery-input-area__wrapper gallery-input-area__wrapper_style'}>
                    <Input state={{placeholder: 'Search ID', type: 'number', keyUpFunction: (event) => dispatch(getPhotoId(event))}}/>
                    <InputSelector objSelectorInput={obj}/>
                    {error && <Error text={errorText}/>}
                </div>
            </div>
            {loader && <Loader top={document.documentElement.scrollTop}/>}
            <div className={'gallery gallery_style'}>
                <div className={'gallery__wrapper gallery__wrapper_style'}>
                    {photos.length === 0  && !loader ?
                        <div className={'gallery__list-null gallery__list-null_style'}>Нет изображений</div> :
                        <div className={'gallery__list gallery__list_style'}>
                            {photos.map(photo => <Photo photo={photo} key={photo.id}/>)}
                        </div>}
                </div>
            </div>
        </>
    )
}
export default Gallery
