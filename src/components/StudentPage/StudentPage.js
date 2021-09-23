import "./StudentPage.css";
import {useEffect, useState} from "react";
import {useSelectedStudentContext, useStudentContext} from "../../Context/StudentContext";
import {useHistory, useParams} from "react-router-dom";


const StudentPage = () => {
    const params = useParams();
    const {studentList,setStudentList} = useStudentContext();
    const history = useHistory();
    const selectedStudentMatch = studentList.filter(item => String(item.id)===params.id); /*주소창 직접 입력시 string 으로 저장되므로 String 으로 바꿔줌*/
    const selectedStudent = selectedStudentMatch[0]



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



    /*주소창에 id를 직접 입력하는 경우를 대비하여 selectedStudent 에서 가져오지 않고 id 에서 useParams 를 이용*/




    const [newProfile, setNewProfile] = useState('');
    const [newPhone, setNewPhone] = useState('');
    useEffect(()=>setNewProfile(selectedStudent.profile_img),[selectedStudent]);



    const deleteStudent = (id) => {
        const newStudentList = studentList.filter(item => item.id !== id);
        setStudentList(newStudentList);

    } /*id를 받아서 해당 학생을 list 에서 삭제*/

    const changeStudent = (changedStudent) => {
        const targetIndex = studentList.findIndex(item=>item.id === changedStudent.id);
        const newStudentList = studentList.slice();
        const changedItem = {...studentList[targetIndex], name: changedStudent.name, grade: changedStudent.grade, profileImg: changedStudent.profile_img}
        newStudentList.splice(targetIndex, 1, changedItem)
        setStudentList(newStudentList);

    } /*바뀐 student 정보를 받아서 해당 학생과 id가 일치하는 학생 정보를 갱신함 */


    const handleHomeButton = () => {
        history.goBack();
    }

    const handleSaveButton = () => {

        const changedStudent = {
            id: selectedStudent.id,
            name: selectedStudent.name,
            grade: selectedStudent.grade,
            profile_img: newProfile,
        }

    }

    const handleDeleteButton = () => {
        deleteStudent(selectedStudent.id); /*id를 delete 함수에 넘겨줘서 삭제*/
        /*detail 창의 정보들을 name 을 빈칸으로 바꿔서 지움 */
    }




        return (

            <div className="studentPage">

                <div className="PageButton">
                    <button className="saveButton" onClick={() => handleSaveButton()}>저장</button>
                    <button className="deleteButton" onClick={() => handleDeleteButton()}>삭제</button>
                    <button className="homeButton" onClick={() => handleHomeButton()}>학생 목록 페이지로</button>

                </div>
                <div className="PageContent">
                    <div className="profileBox">
                        <img className="profileImage" src={selectedStudent.profile_img} alt="프로필 이미지를 찾을 수 없습니다."/>
                    </div>
                    <div className="detailInformation">
                        <div className="nameChange">
                            <span className="nameChangeText">이름</span>
                            <input className="nameChangeInput" value={selectedStudent.name || ''} disabled/>
                        </div>

                        <div className="gradeChange">
                            <span className="gradeChangeText">학년</span>
                            <input className="gradeChangeInput" value={selectedStudent.grade || ''} disabled/>
                        </div>

                        <div className="profileChange">
                            <span className="profileChangeText">프로필</span>
                            <input className="profileChangeInput" value={newProfile || ''}
                                   onChange={(e) => setNewProfile(e.target.value)}/>
                        </div>

                        <div className="phoneChange">
                            <span className="phoneChangeText">전화번호</span>
                            <input className="phoneChangeInput" value={newPhone || ''}
                                   onChange={(e) => setNewPhone(e.target.value)}/>
                        </div>


                    </div>
                </div>
            </div>
        );


}

export default StudentPage;