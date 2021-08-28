import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

function WorkoutMove({item, index, gid}) {
  const {id, name, desc, tags} = item

    return (
      <Draggable draggableId={`${gid}-${id}-${index}`} index={index}>
      {(provided, snapshot) => (
        <a href="/" className="drag" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <img className="workout_thumb" src={`../images/thumbs/${id}.jpg`} alt={id} />
        </a>
        )}
      </Draggable>
    )
}

export default WorkoutMove
