import React, {useContext, useRef, useEffect} from 'react'
import { ModalContext } from '../context/ModalContext'

function VideoModal({isOpen, basename}) {
    const {setShowModal, current} = useContext(ModalContext)

    const videoRef = useRef()
    const modalRef = useRef()

    // to load video, after setting video source 
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
        } 
    }, [basename])

    // esc key, and click outside, close modal --- clean up when component unload 
    useEffect(()=> {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false)
            } 
        }
        const handleClickOutside = (e) => {
            if (modalRef.current === e.target)  {
                setShowModal(false)
            }
        }
        window.addEventListener('keydown', handleEscKey)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('keydown', handleEscKey)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={modalRef} className={isOpen ? "modal show-modal" : "modal"}>
            <div className="modal-content">
                <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
                <h1>Video</h1>

                <video ref={videoRef} id="player" preload="true" autoPlay muted loop playsInline controls data-poster={`/images/thumbs/${current}.jpg`}>
                    <source id="player_source" className="player_source" src={`/videos/${current}.mp4`} type="video/mp4" />
                    sorry, your browser does not support video 
                </video>          
            </div>
        </div>
    )
}

export default VideoModal
