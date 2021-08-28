import React, { useState } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import TimeSlot from './components/TimeSlot'
import VideoModal from './components/VideoModal'
import { ModalContext } from './context/ModalContext'

import "./TimelineStarwar.css"
import initData from './data/groups.json'

function TimelineStarwar() {
  const [data, setData] = useState(initData)
  const [showModal, setShowModal] = useState(false)
  const [current, setCurrent] = useState()  // current video's basename

  const handleDragEnd = (result) => {
    console.log(result)

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
		<div className="container starwar-container">	
			<header className="clearfix">
				<h2>锻炼时间表 <span>每日计划</span></h2>
				<div className="support-note">
					<span className="note-ie">Sorry, only modern browsers.</span>
				</div>
			</header>
			

    <ModalContext.Provider value={{showModal, setShowModal, current, setCurrent}}>
      <VideoModal isOpen={showModal} basename={current} />

			<section className="main">
				<ul className="timeline">
					<DragDropContext onDragEnd={handleDragEnd}>
            {Object.keys(data).map((groupId, indexGroup) => 
              <TimeSlot dataGroup={data[groupId]} index={groupId} key={groupId} bodyIndex={indexGroup+1}/>
            )}
					</DragDropContext>
				</ul>
			</section>
    </ModalContext.Provider>
		</div>
  )
}

export default TimelineStarwar
