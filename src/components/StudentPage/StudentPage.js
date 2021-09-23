import "./StudentPage.css";
import {useEffect, useState} from "react";
import {useStudentContext} from "../../Context/StudentContext";
import {useHistory, useParams} from "react-router-dom";
import Confirm from "./Confirm/Confirm";
import LockIcon from "../../image/Lock.png"

const StudentPage = () => {
    const params = useParams();
    const {studentList,setStudentList} = useStudentContext();
    const history = useHistory();
    const selectedStudentMatch = studentList.filter(item => String(item.id)===params.id); /*주소창 직접 입력시 string 으로 저장되므로 String 으로 바꿔줌*/
    const selectedStudent = selectedStudentMatch[0]

    /*주소창에 id를 직접 입력하는 경우를 대비하여 selectedStudent 에서 가져오지 않고 id 에서 useParams 를 이용*/


    const [newProfile, setNewProfile] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newMajor, setNewMajor] = useState('');
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [isLocked, setLocked] = useState(false); /*일일히 .locked 치기도 번거로우며 렌더가 잘 안돼서 따로 뺐음*/

    useEffect(()=>setLocked(!selectedStudent.locked),[]); /*state 가 바뀌어야만 render 가 됨. 왤까?*/

    useEffect(()=>setNewProfile(selectedStudent.profile_img),[selectedStudent]);
    useEffect(()=>setNewPhone(selectedStudent.phone),[selectedStudent]);
    useEffect(()=>setNewEmail(selectedStudent.email),[selectedStudent]);
    useEffect(()=>setNewMajor(selectedStudent.major),[selectedStudent]);




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
            "id": selectedStudent.id,
            "name": selectedStudent.name,
            "grade": selectedStudent.grade,
            "profile_img": newProfile,
            "email": newEmail+"@waffle.hs.kr",
            "phone": "000-0000-0000",
            "major": newMajor,
            "locked": false
        }

    }

    const toggleConfirm = () => {
        setConfirmVisible(!isConfirmVisible);
        /*modal 창 띄우기 */
    }

    const handleLockButton = () => {
        setLocked(!isLocked);
        selectedStudent.locked=isLocked;

    } /*잠금버튼 함수*/





        return (

            <div className="studentPage">
                <div className="pageHeader">
                    <button className="homeButton" onClick={() => handleHomeButton()}>← 학생 목록 페이지로</button>
                </div>

                <Confirm selectedStudent={selectedStudent} toggleConfirm={()=>toggleConfirm()} isConfirmVisible={isConfirmVisible}/>

                <div className="pageButton">
                    <button className="lockButton" onClick={() => handleLockButton()}>잠금</button>
                    <button className="saveButton" onClick={() => handleSaveButton()}>저장</button>
                    <button className="deleteButton" onClick={() => toggleConfirm()}>삭제</button>
                </div>
                <div className="pageContent">
                    <div className="profileBox">
                        <img className="profileImage" src={selectedStudent.profile_img} alt="프로필 이미지를 찾을 수 없습니다."/>
                    </div>
                    <div className="immutableInformation">
                        <div className="nameChange">
                            <span className="nameChangeText">이름</span>
                            <input className="nameChangeInput" value={selectedStudent.name || ''} disabled/>
                        </div>

                        <div className="gradeChange">
                            <span className="gradeChangeText">학년</span>
                            <input className="gradeChangeInput" value={selectedStudent.grade || ''} disabled/>
                        </div>
                    </div>
                    <div className="informationIcon">정보</div>

                    <div className="informationSection">

                        {selectedStudent.locked?
                            <div className="lockedScreen">
                                <img className="lockImg" src={LockIcon} alt="자물쇠 아이콘"/>
                                수정하려면 잠금을 해제하세요.
                            </div>


                            : <div> </div>}

                        <div className="phoneChange">
                            <span className="phoneChangeText">전화번호</span>
                            <input className="phoneChangeInput" value={newPhone || ''}
                                   onChange={(e) => setNewPhone(e.target.value)}/>
                        </div>
                        <div className="emailChange">
                            <span className="emailChangeText">이메일</span>
                            <input className="emailChangeInput" value={newEmail || ''}
                                   onChange={(e) => setNewEmail(e.target.value)}/>
                        </div>
                        <div className="majorChange">
                            <span className="majorChangeText">전공</span>
                            <select className="majorInput" defaultValue={selectedStudent.major}>
                                <option value="frontend">frontend</option>
                                <option value="backend">backend</option>
                                <option value="android">android</option>
                                <option value="iOS">iOS</option>
                            </select>
                        </div>

                        <div className="profileChange">
                            <span className="profileChangeText">프로필</span>
                            <input className="profileChangeInput" value={newProfile || ''}
                                   onChange={(e) => setNewProfile(e.target.value)}/>
                        </div>

                    </div>


                    </div>
            </div>
        );


}

export default StudentPage;