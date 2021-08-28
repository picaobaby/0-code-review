import React, {useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'

import Cell from './components/Cell'
import FooterSVG from './components/FooterSVG'
import ListAll from './components/ListAll'
import VideoModal from './components/VideoModal'

import { ModalContext } from './context/ModalContext'
import './Workout30Days.css'
import categoryData from './data/category.json'

function Workout30Days() {
  const [data, setData] = useState(categoryData)
  const [showModal, setShowModal] = useState(false)
  const [current, setCurrent] = useState()  // current video's basename

  // break data into 2 parts, one for alldata, one for grid data 
  const {all_workouts, ...gridData} = data

  const handleDragEnd = (result) => {
    if (!result.destination) return 

    const groupIdFrom = result.source.droppableId
    const indexFrom   = result.source.index
    const groupIdTo   = result.destination.droppableId
    const indexTo     = result.destination.index

    const cloneData       = {...data}
    const dataFrom        = cloneData[groupIdFrom]['workouts']
    const dataTo          = cloneData[groupIdTo]['workouts']
    const cloneDataFrom   = [...dataFrom]
    const cloneDataTo     = [...dataTo]

    if (groupIdFrom === groupIdTo) {
      const [removed] = cloneDataFrom.splice(indexFrom, 1)
      cloneDataFrom.splice(indexTo, 0, removed)
      cloneData[groupIdFrom]['workouts']  = cloneDataFrom
      setData(cloneData)
    } 
    else {
      const [removed] = cloneDataFrom.splice(indexFrom, 1)
      cloneDataTo.splice(indexTo, 0, removed)
      cloneData[groupIdFrom]['workouts']  = cloneDataFrom
      cloneData[groupIdTo]['workouts']    = cloneDataTo
      setData(cloneData)
    }
  }

  return (
    <ModalContext.Provider value={{showModal, setShowModal, current, setCurrent}}>
    <main className="workout30days">
      <h1>Exercises by body area</h1>

      <VideoModal isOpen={showModal} basename={current} />

      <section className="workout-main">
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListAll all_workouts={all_workouts} data={data} setData={setData} />

          <div className="schedule-list js-schedule-list">
            {Object.keys(gridData).map((groupId, index) => 
              <Cell data={gridData[groupId]} key={groupId}/> 
            )}
          </div>
        </DragDropContext>
      </section>

      <aside>
        <p>按身体部位分类的锻炼动作 <span className="large"><span className="js-day-count">130</span> total</span></p>
      </aside> 

      <FooterSVG />
    </main>
    </ModalContext.Provider>
  )
}

export default Workout30Days