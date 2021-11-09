import styles from './Dashboard.module.scss'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'
import React, { useEffect, useState, useRef } from 'react'
import request from '../../API/API'
import Chart from "./PieChart/Chart";

const Dashboard = ({ studentList }) => {
  const [stat, setStat] = useState()

  const useInterval = (callback, delay) => {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  } //Custom Hook

    useEffect(()=>{},[studentList])

  useInterval(() => {
    request.get('/student/stat').then((response) => {
      setStat(response.data.count)
    })
  }, 3000)



  return stat ? (
    <div className={styles.dashBoard}>
      <Chart studentList={studentList} />
      <span className={styles.totalStudent}>총 {studentList.length}명</span>

      <div className={styles.statTable}>
        <span> 1학년: {stat['1']}명</span>
        <span> 2학년: {stat['2']}명</span>
        <span> 3학년: {stat['3']}명</span>
      </div>
    </div>
  ) : (
    <div className={styles.dashBoard}>
        <Chart studentList={studentList}/>
      <span className={styles.totalStudent}>총 {studentList.length}명</span>

      <div className={styles.statTable}>Loading...</div>
    </div>
  )
}

export default Dashboard
