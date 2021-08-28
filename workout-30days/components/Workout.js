import React, {useContext} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import { ModalContext } from '../context/ModalContext'


function Workout({data, cellId, index}) {
    const {id, name, desc, tags, repeats} = data
    const dragId = `${cellId}-${id}-${index}`
    const {showModal, setShowModal, current, setCurrent} = useContext(ModalContext)

    const handleClick = (e) => {
        e.preventDefault()
        setShowModal(true)
        // update video source ---- need to change prop name (basename?)
        setCurrent(id)      
    }

    return (
        <Draggable draggableId={`${cellId}-${id}-${index}`} index={index}>
        {(provided, snapshot) => (
            <a onClick={handleClick} className="workout__thumb" href={`/videos/${id}.mp4`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} target="_video">
                <img src={`/images/thumbs/${id}.jpg`} alt={id} />
            </a>
        )}
        </Draggable>
    )
}

export default Workout
