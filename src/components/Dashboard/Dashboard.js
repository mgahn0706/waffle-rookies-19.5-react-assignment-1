import "./Dashboard.css";
import {useStudentContext} from "../../context/StudentContext";
import {PieChart, Pie, ResponsiveContainer,Cell} from "recharts";




const Dashboard = () => {

    const {studentList} = useStudentContext();

    const countStudent = (targetGrade) => {
        return studentList.filter(item => item.grade === targetGrade).length;
    }

    const gradeStat = [
            {"grade": "1학년", "value": countStudent(1)+countStudent('1'), "color": '#FF8C00'},
            {"grade": "2학년", "value": countStudent(2)+countStudent('2'), "color": '#FF8C00'},
            {"grade": "3학년", "value": countStudent(3)+countStudent('3'), "color": '#ADFF2F'}
    ]


    const COLORS =['#FF8C00','#1E90FF','#ADFF2F']


    return(
        <div className={"dashBoard"}>
            <ResponsiveContainer className="pieChartWrapper">
                <PieChart width={400} height={400}>
                    <Pie
                        data={gradeStat}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Dashboard;