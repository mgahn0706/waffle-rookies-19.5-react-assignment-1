import {Pie, PieChart, ResponsiveContainer} from "recharts";
import React, {useEffect, useState} from "react";

const Chart = ({studentList}) => {

    const [chartData, setChartData] = useState([
        {
            grade: '1학년',
            value: 0,
        },
        {
            grade: '2학년',
            value: 0,
        },
        {
            grade: '3학년',
            value: 0,
        },
    ])

    useEffect(()=>{countGrade()},[studentList])

    const countGrade = () => {
        const firstGrade = studentList;
        const secondGrade = studentList;
        const thirdGrade = studentList;
        const first = firstGrade.filter(item=>item.grade===1).length;
        const second = secondGrade.filter(item=>item.grade===2).length;
        const third = thirdGrade.filter(item=>item.grade===3).length;



        setChartData(
            [
                {
                    grade: '1학년',
                    value: first,
                },
                {
                    grade: '2학년',
                    value: second,
                },
                {
                    grade: '3학년',
                    value: third,
                },
            ]
        )



    }






    return(
        <ResponsiveContainer>
    <PieChart>
        <Pie
            label={({grade, value}) => `${grade}: ${value}명`}
            isAnimationActive={false}
            labelLine={false}
            data={chartData}
            nameKey="name"
            dataKey="value"
            innerRadius="25%"
            outerRadius="50%"
            fill="#f0975e"
        />

    </PieChart>
        </ResponsiveContainer>
    )
}
export default Chart