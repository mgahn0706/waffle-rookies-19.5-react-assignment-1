import "./Confirm.css"
import {useSelectedStudentContext, useStudentContext} from "../../../Context/StudentContext";
import {useHistory} from "react-router-dom";

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
                삭제하시겠습니까?
                <button className="cancelButton" onClick={()=>handleCancelButton()}>취소</button>
                <button className="confirmButton" onClick={()=>handleDeleteButton()}>삭제</button>
            </div>
        </div>
    )

}

export default Confirm;