import "./Modal.css";
import {useState} from "react";



const Modal = ({toggleModal, addStudent, modalVisible, studentList}) => {

    const [addedName, setName] = useState('');
    const [addedGrade, setGrade] = useState('');
    const [addedProfile, setProfile] = useState('');


    const handleCloseButton = () => {
        setName('');
        setGrade('');
        setProfile('');
        toggleModal(); /*Modal status update */
    }

    const handleAddButton = () => {
        const newStudent = {
            id: Math.random(),
            name: addedName,
            grade: addedGrade,
            profileImg: addedProfile,
        }

        const sameName = studentList.find(item=>item.name===newStudent.name);

        if(!(addedGrade in ["1","2","3"]) || (addedName.length!==2 && addedName.length!==3)){
            window.alert("이름 또는 학년이 올바르지 않습니다.");
        }

        else if(sameName===undefined){

            addStudent(newStudent);
            setName('');
            setGrade('');
            setProfile('');
            toggleModal(); /* addStudent 에 newStudent 를 보냄 + 입력창 초기화 및 Modal state 를 변경. */
            } /*이름 같은 사람이 아예없고 입력도 적절한 경우*/


        else if(sameName.grade===Number(newStudent.grade) || sameName.grade===newStudent.grade){
            window.alert("이미 "+sameName.grade+"학년에 동명이인이 있습니다.");
        }

        else if((addedName.length===2 ||addedName.length===3)&&(addedGrade in ["1","2","3"])){
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
                    <input value={addedName} onChange={(e)=>setName(e.target.value)} className="inputName" />
                </div>
                <div className="modalGrade">
                    <span className="textGrade"> 학년 </span>
                    <input value={addedGrade} onChange={(e)=>setGrade(e.target.value)} className="inputGrade"/>
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