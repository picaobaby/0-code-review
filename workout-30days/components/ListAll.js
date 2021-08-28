import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { nanoid} from 'nanoid'
import Workout from './Workout'
import workoutData from '../data/workout.json'

function ListAll({all_workouts, data, setData}) {
    const {id, name, desc, workouts} = all_workouts   

    const addGroup = () => {
      let cloneData = {...data}
      const groupId = 'group_' + nanoid()
      const newGroup = {
        [groupId]: {
          id: groupId, 
          name: '点击这里更改名字', 
          workouts: []
        }
      }
      cloneData = {...data, ...newGroup}
      setData(cloneData)
    }

    return (
        <div className="workout-question">
            <span>点击并按住小图从而选择和移动到其他方框中</span>
            <a className="button js-did-workout" onClick={addGroup}>增加新类别</a>

          {/* <div className="workout-day">
            <p>{workouts.length} moves left</p>
            <a className="button js-did-workout" onClick={addGroup}>Add Group</a>

            <Droppable droppableId={id} direction="horizontal">
            {(provided, snapshot) => (
                <div className="workout__links" ref={provided.innerRef} {...provided.droppableProps}>
                  {workouts.map( (workoutId, index) => 
                    <Workout key={`${workoutId}-${index}`} data={workoutData[workoutId]} index={index} cellId={id}/> 
                  )}
                  {provided.placeholder}   
                </div>
            )}
            </Droppable>
          </div> */}

        </div>
    )
}

export default ListAll
