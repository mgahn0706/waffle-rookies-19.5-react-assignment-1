import "./Modal.css";
import {useState} from "react";



const Modal = ({toggleModal}) => {



    const handleCloseButton = () => {

      toggleModal(false);
    }


    return (
        <div className="modalWrapper">
            <div className="modal">
                <div className="modalName">
                    <span className="textName"> 이름 </span>
                    <input className="inputName"/>
                </div>
                <div className="modalGrade">
                    <span className="textGrade"> 학년 </span>
                    <input className="inputGrade"/>
                </div>
                <div className="modalProfile">
                    <span className="textProfile"> 프로필 </span>
                    <input className="inputProfile"/>
                </div>
                <div className="modalButton">
                    <button className="closeButton" onClick={handleCloseButton}>닫기</button>
                    <button className="addButton">추가</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;