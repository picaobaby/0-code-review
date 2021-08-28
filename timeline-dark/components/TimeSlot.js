import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import WorkoutMove from './WorkoutMove'
import workoutData from '../data/workouts.json'

function TimeSlot({ dataGroup}) {
    const {id, name, desc, time_range, workouts} = dataGroup 

    return (
      <li className="event" data-date={time_range}>
        <h3>{name}</h3>
        <p>{desc}.</p>    
  
        <Droppable droppableId={`${id}`} direction="horizontal">
        {(provided, snapshot) => (
          <div className="droppable-area" ref={provided.innerRef} {...provided.droppableProps}>

            {workouts.map((workout_id, index) => 
              <WorkoutMove key={index} index={index} gid={id} item={workoutData[workout_id]} />
            )}

          {provided.placeholder}
          </div>
        )}
        </Droppable>
      </li>
    )
}

export default TimeSlot
