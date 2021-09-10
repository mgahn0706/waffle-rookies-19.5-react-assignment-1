import "./Modal.css";
import {useState} from "react";



const Modal = ({toggleModal, addStudent, modalVisible, studentList}) => {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [profile, setProfile] = useState('');


    const handleCloseButton = () => {
        setName('');
        setGrade('');
        setProfile('');
        toggleModal(); /*Modal status update */
    }

    const handleAddButton = () => {
        const newStudent = {
            id: Math.random(),
            name: name,
            grade: grade,
            profileImg: profile,
        }
        const sameName = studentList.find(item=>item.name===newStudent.name);

        if(sameName===undefined && (name.length===2 || name.length===3)&&(grade==="3" || grade==="2" || grade==="1")){

            addStudent(newStudent);
            setName('');
            setGrade('');
            setProfile('');
            toggleModal(); /* addStudent 에 newStudent 를 보냄 + 입력창 초기화 및 Modal state 를 변경. */
            } /*이름 같은 사람이 아예없고 입력도 적절한 경우*/


        else if(sameName.grade===Number(newStudent.grade) || sameName.grade===newStudent.grade){
            window.alert("이미 "+sameName.grade+"학년에 동명이인이 있습니다.");
        }

        else if((name.length===2 || name.length===3)&&(grade==="3" || grade==="2" || grade==="1")){
            addStudent(newStudent);
            setName('');
            setGrade('');
            setProfile('');
            toggleModal();
        } /*이름은 같지만 동명이인이 아니고 입력이 적절한 경우*/

        else {
            window.alert("이름 또는 학년이 올바르지 않습니다.");
        } /*입력 형식이 맞지 않는 경우*/
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

                    <input value={profile} onChange={(e)=>setProfile(e.target.value)} className="inputProfile"/>
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