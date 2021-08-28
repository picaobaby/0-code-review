import React, {useState, useEffect, useRef} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import useOnClickOutside from '../hooks/useOnClickOutside'
import useKeyPress from '../hooks/useKeyPress'

import Workout from './Workout'
import workoutData from '../data/workout.json'

function Cell({data}) {
    const [cellData, setCellData]       = useState(data)
    const [isEditting, setIsEditting]   = useState(false)
    const inputRef = useRef()
    
    const {id, name, desc, icon, workouts} = cellData
    const [cellName, setCellName] = useState(data.name)

    // click outside to close 
    useOnClickOutside(inputRef, () => setIsEditting(false));

    const test = (e) => {
        console.log(e.target)     // div itself 
        console.log(inputRef)     // inputRef.current `undefined` at the time, why??
    }

    // use custom hook 
    const enterPress    = useKeyPress('Enter');
    const escPress      = useKeyPress('Escape');

    useEffect(() => {
        if (isEditting) {
          // press Enter, save name, exit input box
          if (enterPress) {
            setCellName(cellName)
            setIsEditting(false);
          }
          // press `Escape`, cancel change, exit input box
          if (escPress) {
            setCellName(data.name)
            setIsEditting(false);
          }
        }
      }, [enterPress, escPress]); // watch the Enter and Escape key presses

    return (
        <div className="js-day" data-status="false">
            {!isEditting 
                ? (<div className="workout__info" onClick={() => setIsEditting(true)}>{cellName}</div>)
                // ? (<div className="workout__info" 
                //         onClick={ e => test(e)}>{cellName}
                //    </div>)

                : (<div className="workout__info">
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={cellName} 
                            onChange={e => setCellName(e.target.value)} />
                   </div>)}

            <Droppable droppableId={`${id}`} direction="horizontal">
            {(provided, snapshot) => (
                <div className="workout__links" ref={provided.innerRef} {...provided.droppableProps}>
                    {workouts.map( (workoutId, index) => 
                        <Workout data={workoutData[workoutId]} key={`${id}-${workoutId}-${index}`} index={index} cellId={id} />
                    )}  
                    {provided.placeholder}   
                </div>
            )}
            </Droppable>
        </div>
    )
}

export default Cell
