import "./StudentList.css";
import StudentItem from "./StudentItem/StudentItem";
import {useSelectedStudentContext, useStudentContext} from "../../Context/StudentContext";



const StudentList = ({filteredStudentList, handleSelectStudent}) => {
const {studentList} = useStudentContext();
const {selectedStudent} = useSelectedStudentContext();

    if(studentList.length===0){
        return (
            <div className={"listSection"}>

                <table className="studentListSection">
                    <thead>
                    <tr className="listHeader">
                        <th className="nameHeader">이름</th>
                        <th className="gradeHeader">학년</th>
                        <th className="blankHeader"/>
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
                        <th className="blankHeader"/>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudentList.map((item) => (
                         <StudentItem key={item.id} item={item} handleSelectStudent={handleSelectStudent} isSelected={selectedStudent===item}/>)
                        /*만약 새로 추가된 학생이라면 initial state 를 selected 되게 하도록 설정한다.*/
                    )}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentList;