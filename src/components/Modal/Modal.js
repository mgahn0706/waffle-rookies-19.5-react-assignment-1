import "./Modal.css";
import {useState} from "react";



const Modal = ({toggleModal, addStudent, modalVisible}) => {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [profile, setProfile] = useState('');


    const handleCloseButton = () => {

      toggleModal();
    }

    const handleAddButton = () => {
        const newStudent = {
            id: Math.random(),
            name: name,
            grade: grade,
            profile: profile,
        }

        if((name.length===2 || name.length===3)&&(grade==="3" || grade==="2" || grade==="1")){

            addStudent(newStudent);
            setName('');
            setGrade('');
            setProfile('');
            toggleModal();
        }
        else {
            window.alert("제대로 입력해라");
        }
    }


    return (
        <div className={"modalWrapper"+(modalVisible ? "visible" : "")} >
            <div className="modal">
                <div className="modalName">
                    <span className="textName"> 이름 </span>
                    <input value={name} onChange={(e)=>setName(e.target.value)} className="inputName" />
                </div>
                <div className="modalGrade">
                    <span className="textGrade"> 학년 </span>
                    <input value={grade} onChange={(e)=>setGrade(e.target.value)} className="inputGrade"/>
                </div>
                <div className="modalProfile">
                    <span className="textProfile"> 프로필 </span>
                    <input value={profile} onChange={(e)=>setProfile(e.target.value)}className="inputProfile"/>
                </div>
                <div className="modalButton">
                    <button className="closeButton" onClick={handleCloseButton}>닫기</button>
                    <button className="addButton" onClick={handleAddButton}>추가</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;