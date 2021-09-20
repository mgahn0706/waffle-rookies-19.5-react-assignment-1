import "./StudentList.css";
import StudentItem from "./StudentItem/StudentItem";
import {useFilteredStudentsContext, useStudentContext} from "../../context/StudentContext";



const StudentList = ({filteredStudentList, showDetail, selectedStudentID}) => {
const {studentList} = useStudentContext();

    if(studentList.length===0){
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

                </table>

                <div className="emptyListSection">
                학교에 학생이 없어요 :(

                </div>
            </div>
        );
    }
    else {
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
                    {filteredStudentList.map((item) => (
                        (selectedStudentID === item.id ?
                            <StudentItem key={item.id} item={item} showDetail={showDetail} isSelected={true}/>
                            : <StudentItem key={item.id} item={item} showDetail={showDetail} isSelected={false}/>)
                        /*만약 새로 추가된 학생이라면 initial state 를 selected 되게 하도록 설정한다.*/
                    ))}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentList;