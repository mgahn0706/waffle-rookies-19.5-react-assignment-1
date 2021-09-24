import "./Confirm.css"
import {useSelectedStudentContext, useStudentContext} from "../../../Context/StudentContext";
import {useHistory} from "react-router-dom";
import WarningIcon from "../../../image/Warning.png"
import DeleteIcon from "../../../image/Delete.png"
import CancelIcon from "../../../image/Cancel.png"


const Confirm = ({selectedStudent,toggleConfirm,isConfirmVisible}) => {

    const {studentList, setStudentList} = useStudentContext();
    const {setSelectedStudent} = useSelectedStudentContext();
    const history = useHistory();
    const nullStudent = {
        "id": null,
        "name": null,
        "grade": null,
        "profile_img": null,
        "email": null,
        "phone": null,
        "major": null,
        "locked": false
    }


    const deleteStudent = (id) => {
        const newStudentList = studentList.filter(item => item.id !== id);
        setStudentList(newStudentList);
        setSelectedStudent(nullStudent);

    } /*id를 받아서 해당 학생을 list 에서 삭제*/


    const handleDeleteButton = () => {
        history.replace('/students')
        deleteStudent(selectedStudent.id); /*id를 delete 함수에 넘겨줘서 삭제*/

        /*detail 창의 정보들을 name 을 빈칸으로 바꿔서 지움 */
    }

    const handleCancelButton = () =>{
        toggleConfirm();
    }


    return (
        <div className={"confirmModalWrapper"+(isConfirmVisible ? "visible" : "")}>
            <div className="confirmModal">
                <div className="confirmHeader">
                    <img className="warningIcon" src={WarningIcon}/>
                    <span className="deleteStudentText">
                          학생을 삭제합니다.
                    </span>

                </div>
                <div className="warningText">
                    이 작업은 되돌릴 수 없습니다.
                </div>


                <div className="confirmModalButton">
                    <button className="cancelButton" onClick={()=>handleCancelButton()}>
                        <img src={CancelIcon} alt="취소아이콘" className="cancelIcon"/>
                        취소
                    </button>
                    <button className="confirmButton" onClick={()=>handleDeleteButton()}>
                        <img src={DeleteIcon} alt="삭제아이콘" className="confirmIcon"/>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Confirm;