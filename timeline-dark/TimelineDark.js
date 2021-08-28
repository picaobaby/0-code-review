import React, { useState } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import TimeSlot from './components/TimeSlot'
import initData from './data/groups.json'
import "./TimelineDark.css"

function TimelineDark() {
  const [data, setData] = useState(initData)

  const handleDragEnd = (result) => {
    if (!result.destination) return 

    const cloneData   = {...data}
    const groupIdFrom = result.source.droppableId
    const groupIdTo   = result.destination.droppableId
    const indexFrom   = result.source.index
    const indexTo     = result.destination.index

    const dataFrom    = cloneData[groupIdFrom]['workouts']
    const dataTo      = cloneData[groupIdTo]['workouts']
    const cloneDataFrom   = [...dataFrom]
    const cloneDataTo     = [...dataTo]

    // same group
    if (groupIdFrom === groupIdTo) {
      const [removed] = cloneDataFrom.splice(indexFrom, 1)
      cloneDataFrom.splice(indexTo, 0, removed)
      cloneData[groupIdFrom]['workouts']  = cloneDataFrom
      setData(cloneData)
    } 
    // diff groups
    else {
      const [removed] = cloneDataFrom.splice(indexFrom, 1)
      cloneDataTo.splice(indexTo, 0, removed)
      cloneData[groupIdFrom]['workouts']  = cloneDataFrom
      cloneData[groupIdTo]['workouts']    = cloneDataTo
      setData(cloneData)
    }
  }

  return (
    <div id="content" className="timeline-dark">
      <h1>Workout Scheduling</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
      <ul className="timeline">
        {Object.keys(data).map((groupId, indexGroup) => 
          <TimeSlot dataGroup={data[groupId]} index={groupId} key={indexGroup} />
        )}
      </ul>
      </DragDropContext>
    </div>
  )
}

export default TimelineDark
