import "./StudentList.css";
import StudentItem from "./StudentItem/StudentItem";

const StudentList = ({studentList}) => {

    return (
        <div className={"listSection"}>
            <table className="studentListSection">
                <thead>
                    <tr className="listHeader">
                        <th className="nameHeader">이름</th>
                        <th className="gradeHeader">학년</th>
                        <th className="blankHeader"></th>
                    </tr>
                </thead>
                <tbody>
                        {studentList.map(item => (
                            <StudentItem key={item.id} item={item} />

                        ))}

                </tbody>
            </table>
        </div>
    );
}

export default StudentList;