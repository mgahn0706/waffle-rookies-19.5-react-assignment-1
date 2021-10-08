import "./Dashboard.css";
import {PieChart, Pie, ResponsiveContainer} from "recharts";





const Dashboard = ({studentList}) => {

    const countStudent = (targetGrade) => {
        return studentList.filter(item => item.grade === targetGrade).length;
    }

    const gradeStat = [
            {"grade": "1학년", "value": countStudent(1)+countStudent('1'), "color": '#FF8C00'},
            {"grade": "2학년", "value": countStudent(2)+countStudent('2'), "color": '#0055FF'},
            {"grade": "3학년", "value": countStudent(3)+countStudent('3'), "color": '#ADFF2F'}
    ]




    return(
        <div className="dashBoard">
            <ResponsiveContainer >
                <PieChart>
                    <Pie
                        label={({ grade, value }) =>  `${grade}: ${value}명` }
                        isAnimationActive={false}
                        labelLine={false}
                        data={gradeStat}
                        nameKey="name"
                        dataKey="value"
                        innerRadius="25%"
                        outerRadius="50%"
                        fill="#f0975e">

                        
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <span className="totalStudent">총 {studentList.length}명</span>
        </div>
    );
}

export default Dashboard;