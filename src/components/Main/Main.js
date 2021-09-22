import './Main.css';
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Search from "../Search/Search";
import StudentAdder from "../StudentAdder/StudentAdder";
import StudentList from "../StudentList/StudentList";
import {useEffect, useState} from "react";
import StudentDetail from "../StudentDetail/StudentDetail";
import Modal from "../Modal/Modal";
import {useSelectedStudentContext, useStudentContext} from "../../Context/StudentContext";



const Main = () => {
    const {selectedStudent, setSelectedStudent} = useSelectedStudentContext();
    const {studentList, setStudentList} = useStudentContext();
    const nullStudentInfo = [null,null,null,null];
    const [filteredStudents, setFilteredStudents] = useState(studentList);

    const [modalVisible, setModalVisible] = useState(false);

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

    const filterStudent = (filter) => {
        if(filter===''){
            setFilteredStudents(studentList);

        }
        else{
            const filteredStudents =studentList.filter((student)=>student.name.includes(filter))
            setFilteredStudents(filteredStudents);

        }


    } /*새로운 filteredStudent 라는 state 를 만들어서 필터링 */

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }; /*Modal 상태 변경*/


    const addStudent = (newStudent) => {
        setStudentList([...studentList,newStudent]);
        setSelectedStudent(newStudent);

    }; /*modal 에서 newStudent 를 받아 studentList 업데이트 후 해당 학생 선택상태는 StudentList 컴포넌트로, 정보는 StudentDetail 컴포넌트로 보낸다. */
    useEffect(()=>{filterStudent('')},[studentList]); /*학생이 추가되었을 때 바로 list 에 띄우는 useEffect*/



    const showDetail = (selectedStudent) => {
        if(selectedStudent.id===null){
            setSelectedStudent(nullStudent);

        } /*아무도 선택되지 않은 경우*/
        else {
            selectedStudent = studentList.filter((student) => (student.id === selectedStudent.id));
            setSelectedStudent(selectedStudent[0]);

        }

    } /*studentItem 의 id 를 가져와서 대조 후, 해당 학생의 이름, 학년, 프로필 이미지 링크를 보내는 함수 */
    useEffect(()=>{},[selectedStudent]); /*선택하자마자 info 를 보여주도록 하는 useEffect*/


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





    return (
        <div className="App">
            <Header />
            <Dashboard />
            <Modal toggleModal={toggleModal} addStudent={addStudent} modalVisible={modalVisible} studentList={studentList}/>
            <div className={"studentManage"}>
                <div className={"leftScreen"}>
                    <div className="inputSection">
                        <Search filterStudent={filterStudent}/>
                        <StudentAdder toggleModal={toggleModal} />
                    </div>
                    <div className="studentList">
                        <StudentList filteredStudentList={filteredStudents} showDetail={showDetail} />
                    </div>
                </div>
                <div className="verticalBorder">
                </div>
                <div className={"rightScreen"}>
                    <StudentDetail />
                </div>
            </div>
        </div>
    );
}

export default Main;
