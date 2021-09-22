import "./StudentDetail.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelectedStudentContext} from "../../Context/StudentContext";


const StudentDetail = () => {

    const history=useHistory();
    const {selectedStudent,setSelectedStudent} = useSelectedStudentContext();


    const handleDetailButton = () => {

        return(
            history.push('/student/${selectedStudent.id}')
        );
    }
    return (

        <div className="studentDetail">
            <div className={"selectedScreen"+(selectedStudent.id===null ? "Hidden" : "")}>
                왼쪽 표에서 학생을 선택해 주세요.
            </div>

            <div className="detailContent">
                <div className="detailButton">
                        <button className="deleteButton" onClick={handleDetailButton}> detail </button>
                </div>
                <div className="profileBox">
                    <img className="profileImage" src={selectedStudent.profile_img} alt="프로필 이미지를 찾을 수 없습니다."/>
                </div>
                <div className="detailInformation">
                    <div className="nameChange">
                        <span className="nameChangeText">이름</span>
                        <input className="nameChangeInput" value={selectedStudent.name || ''} readOnly />
                    </div>

                    <div className="gradeChange">
                        <span className="gradeChangeText">학년</span>
                        <input className="gradeChangeInput" value={selectedStudent.grade || ''} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;