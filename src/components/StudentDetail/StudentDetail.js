import "./StudentDetail.css";
import {useEffect, useState} from "react";


const StudentDetail = ({selectedStudent, deleteStudent}) => {

    const handleDeleteButton = () => {
      deleteStudent(selectedStudent[3]);
      selectedStudent[0]=null;
    }

    return (

        <div className="studentDetail">
            <div className={"selectedScreen"+(selectedStudent[0]===null ? "Hidden" : "")}>
                왼쪽 표에서 학생을 선택해 주세요.
            </div>
            <div className="detailButton">
                <button className="saveButton">저장</button>
                <button className="deleteButton" onClick={()=>handleDeleteButton()}>삭제</button>

            </div>
            <div className="detailContent">
                <div className="profileBox">
                    <img className="profileImage" src={selectedStudent[2]} alt="프로필 이미지를 찾을 수 없습니다."/>
                </div>
                <div className="detailInformation">
                    <div className="nameChange">
                        <span className="nameChangeText">이름</span>
                        <input className="nameChangeInput" defaultValue={selectedStudent[0]}/>
                    </div>

                    <div className="gradeChange">
                        <span className="gradeChangeText">학년</span>
                        <input className="gradeChangeInput" defaultValue={selectedStudent[1]}/>
                    </div>

                    <div className="profileChange">
                        <span className="profileChangeText">프로필</span>
                        <input className="profileChangeInput" defaultValue={selectedStudent[2]}/>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default StudentDetail