import React from 'react'
import ReactDOM from 'react-dom'
import {Draggable} from 'react-beautiful-dnd'

function WorkoutMove({item, indexItem}) {
    return (
      <Draggable draggableId={`${item.id}`} index={indexItem}>
      {(provided, snapshot) => {
          const dragging = snapshot.isDragging
          const comp = (
            <a href="/" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <img className="thumb_workout" src="images/1.jpg" alt="{item.name}" />
            </a>)

            if (dragging) {
              return ReactDOM.createPortal(comp, document.getElementById('portal'))
            } 
            else {
              return (comp)
            }

      }}
      </Draggable>

    )
}

export default WorkoutMove
