import "./StudentPage.css";
import {useEffect, useState} from "react";
import {useSelectedStudentContext, useStudentContext} from "../../Context/StudentContext";
import {useHistory, useParams} from "react-router-dom";
import Confirm from "./Confirm/Confirm";
import DeleteIcon from "../../image/Delete.png"
import LockIcon from "../../image/Lock.png"
import SaveIcon from "../../image/Save.png"
import UnlockIcon from "../../image/Unlock.png"

const StudentPage = () => {
    const params = useParams();
    const {studentList,setStudentList} = useStudentContext();
    const history = useHistory();
    const {setSelectedStudent} = useSelectedStudentContext();
    const selectedStudentMatch = studentList.filter(item => String(item.id)===params.id); /*주소창 직접 입력시 string 으로 저장되므로 String 으로 바꿔줌*/
    const selectedStudent = selectedStudentMatch[0]

    /*주소창에 id를 직접 입력하는 경우를 대비하여 selectedStudent 에서 가져오지 않고 id 에서 useParams 를 이용*/


    const [newProfile, setNewProfile] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newMajor, setNewMajor] = useState('');
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [isLocked, setLocked] = useState(false); /*일일히 .locked 치기도 번거로우며 렌더가 잘 안돼서 따로 뺐음*/

    const formatEmail = (email) =>{
        if(!email){
            return ""; /*email 안정해진 경우 그냥 빈칸 출력*/
        }
        else{
            return selectedStudent.email.slice(0,selectedStudent.email.indexOf("@"));
        }
    }


    useEffect(()=>setLocked(!selectedStudent.locked),[]); /*state 가 바뀌어야만 render 가 됨. 왤까?*/

    useEffect(()=>setNewProfile(selectedStudent.profile_img),[selectedStudent]);
    useEffect(()=>setNewPhone(selectedStudent.phone),[selectedStudent]);
    useEffect(()=>setNewEmail(formatEmail(selectedStudent.email)),[selectedStudent]);
    useEffect(()=>setNewMajor(selectedStudent.major),[selectedStudent]);




    const changeStudent = (changedStudent) => {
        const targetIndex = studentList.findIndex(item=>item.id === changedStudent.id);
        const newStudentList = studentList
        newStudentList.splice(targetIndex,1,changedStudent)
        setStudentList(newStudentList);
        setSelectedStudent(changedStudent);


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
            "phone": newPhone,
            "major": newMajor,
            "locked": false /*저장하려면 어차피 잠금을 푼 상태여야 하므로*/
        }


        changeStudent(changedStudent);

    }


    const toggleConfirm = () => {
        setConfirmVisible(!isConfirmVisible);


        /*modal 창 띄우기 */
    }

    const handleLockButton = () => {
        setLocked(!isLocked);
        selectedStudent.locked=isLocked;

    } /*잠금버튼 함수*/

    const handlePhoneInput = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setNewPhone(formattedPhone);
    }

    const formatPhoneNumber = (number) => {
        if(number===null){
            return number;
        }

        const phone = number.replace(/[^\d]/g, "");
        const phoneLength = phone.length;

        if(phoneLength<4){
            return phone;
        }

        else if(phoneLength<8){
            return  phone.slice(0,3)+"-"+phone.slice(3);
        }

        else if (phoneLength<12){
            return phone.slice(0,3)+"-"+phone.slice(3,7)+"-"+phone.slice(7);
        }


   }





        return (

            <div className="studentPage">
                <div className="pageHeader">
                    <button className="homeButton" onClick={() => handleHomeButton()}>← 학생 목록 페이지로</button>
                </div>

                <Confirm selectedStudent={selectedStudent} toggleConfirm={()=>toggleConfirm()} isConfirmVisible={isConfirmVisible}/>
                {!isLocked? <div className="pageButton">
                        <button className="lockButton" onClick={() => handleLockButton()}>
                            <img src={LockIcon} alt="잠금아이콘" className="lockIcon"/>
                            해제
                        </button>
                        <button className="disabledButton">
                            <img src={DeleteIcon} alt="삭제아이콘" className="deleteIcon"/>
                            삭제
                        </button>
                        <button className="disabledButton" >
                            <img src={SaveIcon} alt="저장아이콘" className="saveIcon"/>
                            저장
                        </button>
                            </div> :
                    <div className="pageButton">
                        <button className="lockButton" onClick={() => handleLockButton()}>
                            <img src={UnlockIcon} alt="잠금해제아이콘" className="lockIcon"/>
                            잠금
                        </button>
                        <button className="deleteButton" onClick={() => toggleConfirm()}>
                            <img src={DeleteIcon} alt="삭제아이콘" className="deleteIcon"/>
                            삭제
                        </button>
                        <button className="saveButton" onClick={() => handleSaveButton()}>
                            <img src={SaveIcon} alt="저장아이콘" className="saveIcon"/>
                            저장
                        </button>

                    </div>}

                <div className="infoWrapper">
                    <div className="pageContent">
                        <div className="profileBox">
                            <img className="profileImage" src={newProfile} alt="프로필 이미지를 찾을 수 없습니다."/>
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
                                       onChange={(e) => handlePhoneInput(e)}/>
                            </div>
                            <div className="emailChange">
                                <span className="emailChangeText">이메일</span>
                                <span className="emailSuffix">@waffle.hs.kr</span>
                                <input className="emailChangeInput" value={newEmail || ''}
                                       onChange={(e) => setNewEmail(e.target.value)}/>
                            </div>
                            <div className="majorChange" >
                                <span className="majorChangeText">전공</span>
                                <select className="majorInput" defaultValue={selectedStudent.major} onChange={(e)=>setNewMajor(e.target.value)}>
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

                    <div className="commentSection">
                        <div className="commentIcon">
                            코멘트
                        </div>
                        <div className="commentList">
                            Comments will be here in Seminar 3 :)
                        </div>
                    </div>
                </div>
            </div>
        );


}

export default StudentPage;