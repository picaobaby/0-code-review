import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import WorkoutMove from './WorkoutMove'
import workoutData from '../data/workouts.json'


function TimeSlot({groupId, dataGroup, bodyIndex}) {
    const {id, name, desc, time_range, workouts} = dataGroup 
    const handleChecked = () => {}

    return (
        <li className="event">
            <input type="radio" name="tl-group" checked onChange={handleChecked} />
            <label></label>
            <div className={`thumb user-${bodyIndex}`}><span>{time_range}</span></div>

            <div className="content-perspective">
                <div className="content">
                    <div className="content-inner">
                        <h3>{name}</h3>
                        
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
                        
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TimeSlot
