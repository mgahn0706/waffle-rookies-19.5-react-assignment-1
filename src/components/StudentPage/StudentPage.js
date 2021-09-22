import "./StudentPage.css";
import {useEffect, useState} from "react";
import {useSelectedStudentContext, useStudentContext} from "../../Context/StudentContext";
import {useHistory, useParams} from "react-router-dom";


const StudentPage = () => {
    const {selectedStudent, setSelectedStudent} = useSelectedStudentContext();
    const {studentList,setStudentList} = useStudentContext();
    const params = useParams();

    const history = useHistory();

    const [newName, setNewName] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [newProfile, setNewProfile] = useState('');
    useEffect(()=>{setNewName(selectedStudent.name)},[selectedStudent])
    useEffect(()=>{setNewGrade(selectedStudent.grade)},[selectedStudent])
    useEffect(()=>{setNewProfile(selectedStudent.profile_img)},[selectedStudent])

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

    } /*id를 받아서 해당 학생을 list 에서 삭제*/

    const changeStudent = (changedStudent) => {
        const targetIndex = studentList.findIndex(item=>item.id === changedStudent.id);
        const newStudentList = studentList.slice();
        const changedItem = {...studentList[targetIndex], name: changedStudent.name, grade: changedStudent.grade, profileImg: changedStudent.profileImg}
        newStudentList.splice(targetIndex, 1, changedItem)
        setStudentList(newStudentList);

    } /*바뀐 student 정보를 받아서 해당 학생과 id가 일치하는 학생 정보를 갱신함 */


    const handleHomeButton = () => {
        history.goBack();
    }

    const handleSaveButton = () => {

        const changedStudent = {
            id: selectedStudent.id,
            name: newName,
            grade: newGrade,
            profileImg: newProfile,
        }

        const sameName = studentList.find(item => item.name === changedStudent.name);

        if((newName.length!==2 && newName.length!==3)|| !(newGrade in [1,2,3,"1","2","3"])){
            window.alert("이름 또는 학년이 올바르지 않습니다.");
            /*입력 형식이 잘못된 경우*/
        }

        else if (sameName === undefined) {
            /*값을 변경한 경우는 string, 변경하지 않은 경우는 int 로 인식해서 2가지 경우 다 올바른 입력으로 넣*/

            changeStudent(changedStudent);


        } /* 이름이 같은 사람이 없고 입력이 정확한 경우 change 해준다.*/
        else if (sameName.grade === changedStudent.grade || sameName.grade === Number(changedStudent.grade)) {
            window.alert("이미 " + sameName.grade + "학년에 동명이인이 있습니다.");
        } /*이름이 같고 학년도 같아서 동명이인이 있는 경우*/

        else if ((newName.length === 2 || newName.length === 3) && (newGrade in [1, 2, 3, "1", "2", "3"])) {
            changeStudent(changedStudent);
        } /*이름이 같지만 학년이 같지 않고 입력이 올바른 경우*/

        else {

            window.alert("이름 또는 학년이 올바르지 않습니다.");
            /*입력 형식이 잘못된 경우*/
        }
    }

    const handleDeleteButton = () => {
        deleteStudent(selectedStudent.id); /*id를 delete 함수에 넘겨줘서 삭제*/
        /*detail 창의 정보들을 name 을 빈칸으로 바꿔서 지움 */
    }





    return (

        <div className="studentDetail">

            <div className="detailButton">
                <button className="saveButton" onClick={()=>handleSaveButton()}>저장</button>
                <button className="deleteButton" onClick={()=>handleDeleteButton()}>삭제</button>

            </div>
            <div className="detailContent">
                <div className="profileBox">
                    <img className="profileImage" src={selectedStudent.profile_img} alt="프로필 이미지를 찾을 수 없습니다."/>
                </div>
                <div className="detailInformation">
                    <div className="nameChange">
                        <span className="nameChangeText">이름</span>
                        <input className="nameChangeInput" value={newName || ''} onChange={(e)=>setNewName(e.target.value)} />
                    </div>

                    <div className="gradeChange">
                        <span className="gradeChangeText">학년</span>
                        <input className="gradeChangeInput" value={newGrade || ''} onChange={(e)=>setNewGrade(e.target.value)} />
                    </div>

                    <div className="profileChange">
                        <span className="profileChangeText">프로필</span>
                        <input className="profileChangeInput" value={newProfile || ''} onChange={(e)=>setNewProfile(e.target.value)} />
                    </div>


                </div>
            </div>
        </div>
    );
}

export default StudentPage;