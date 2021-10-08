import "./Modal.css";
import {useState} from "react";
import {toast} from "react-toastify";




const Modal = ({toggleModal, addStudent, modalVisible,studentList}) => {
    const [addedName, setName] = useState('');
    const [addedGrade, setGrade] = useState('');

    const resetInput = () => {
        setName('');
        setGrade('');
    }


    const handleCloseButton = () => {
        toggleModal(); /*Modal status update */
        resetInput();
    }



    const handleAddButton = () => {
        const newStudent = {
            "name": addedName,
            "grade": addedGrade,
        }

        const sameName = studentList.find(item=>item.name===newStudent.name);

        const regex = /^[가-힣|]+$/;

        if(!regex.test(addedName)){
            toast.error("이름은 온전한 한글로만 입력할 수 있습니다.", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } /*영어나 자음만 입력할 경우 걸러줌*/

        else if(!(addedGrade in ["1","2","3",1,2,3]) || (addedName.length!==2 && addedName.length!==3)){
            toast.error("이름 또는 학년이 올바르지 않습니다.", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        else if(sameName===undefined){

            addStudent(newStudent);
            resetInput();
            toggleModal(); /* addStudent 에 newStudent 를 보냄 + 입력창 초기화 및 Modal state 를 변경. */
        } /*이름 같은 사람이 아예없고 입력도 적절한 경우*/


        else if(sameName.grade===Number(newStudent.grade) || sameName.grade===newStudent.grade){
            toast.error(`이미 ${sameName.grade}학년에 동명이인이 있습니다.`, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        else if((addedName.length===2 ||addedName.length===3)&&(addedGrade in ["1","2","3",1,2,3])){
            addStudent(newStudent);
            resetInput();
            toggleModal();
        } /*이름은 같지만 동명이인이 아니고 입력이 적절한 경우*/

        else {
            toast.error("이름 또는 학년이 올바르지 않습니다.", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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