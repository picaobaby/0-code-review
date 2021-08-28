import React, {useContext} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import { ModalContext } from '../context/ModalContext'


function WorkoutMove({item, index, gid}) {
  const {id, name, desc, tags} = item
  const dragId = gid + '-' + id + '-' + index
  const {showModal, setShowModal, current, setCurrent} = useContext(ModalContext)

  const handleClick = (e) => {
      e.preventDefault()
      setShowModal(true)
      setCurrent(id)      
  }

    return (
      <Draggable draggableId={`${gid}-${id}-${index}`} index={index}>
      {(provided, snapshot) => (
          <a onClick={handleClick} className="drag" href={`/videos/${id}.mp4`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} target="_video">
            <img className="workout_thumb"  src={`/images/thumbs/${id}.jpg`} alt={id} />
          </a>
        )}
      </Draggable>
    )
}

export default WorkoutMove
