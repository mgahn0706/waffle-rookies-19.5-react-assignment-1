import styles from './Dashboard.module.scss'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'
import React, { useEffect, useState, useRef } from 'react'
import request from '../../API/API'

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

  useInterval(() => {
    request.get('/student/stat').then((response) => {
      setStat(response.data.count)
    })
  }, 3000)

  useEffect(() => {}, [studentList])

  return stat ? (
    <div className={styles.dashBoard}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            label={({ grade, value }) => `${grade}: ${value}명`}
            isAnimationActive={false}
            labelLine={false}
            data={[
              {
                grade: '1학년',
                value: studentList.filter((item) => item.grade === 1).length,
                key: Math.random,
              },
              {
                grade: '2학년',
                value: studentList.filter((item) => item.grade === 2).length,
                key: Math.random,
              },
              {
                grade: '3학년',
                value: studentList.filter((item) => item.grade === 3).length,
                key: Math.random,
              },
            ]}
            innerRadius="25%"
            outerRadius="50%"
            fill="#f0975e"
            dataKey="value"
          />
        </PieChart>
      </ResponsiveContainer>
      <span className={styles.totalStudent}>총 {studentList.length}명</span>

      <div className={styles.statTable}>
        <span> 1학년: {stat['1']}명</span>
        <span> 2학년: {stat['2']}명</span>
        <span> 3학년: {stat['3']}명</span>
      </div>
    </div>
  ) : (
    <div className={styles.dashBoard}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            label={({ grade, value }) => `${grade}: ${value}명`}
            isAnimationActive={false}
            labelLine={false}
            data={[
              {
                grade: '1학년',
                value: studentList.filter((item) => item.grade === 1).length,
              },
              {
                grade: '2학년',
                value: studentList.filter((item) => item.grade === 2).length,
              },
              {
                grade: '3학년',
                value: studentList.filter((item) => item.grade === 3).length,
              },
            ]}
            nameKey="name"
            innerRadius="25%"
            outerRadius="50%"
            fill="#f0975e"
          />
        </PieChart>
      </ResponsiveContainer>
      <span className={styles.totalStudent}>총 {studentList.length}명</span>

      <div className={styles.statTable}>Loading...</div>
    </div>
  )
}

export default Dashboard
