import './App.css';
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Search from "./components/Search/Search";
import StudentAdder from "./components/StudentAdder/StudentAdder";
import StudentList from "./components/StudentList/StudentList";
import {createContext, useEffect, useState} from "react";
import StudentDetail from "./components/StudentDetail/StudentDetail";
import Modal from "./components/Modal/Modal";



function App() {

    const nullStudentInfo = [null,null,null,null];

    const dummyData = [
        {
            id: 1,
            name: '깃허브',
            grade: 1,
            profileImg: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
        },
        {
            id: 2,
            name: '빈학생',
            grade: 1,
            profileImg: '',
        },
        {
            id: 3,
            name: '리액트',
            grade: 2,
            profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png',
        },
        {
            id: 4,
            name: '스벨트',
            grade: 2,
            profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
        },
        {
            id: 5,
            name: '리덕스',
            grade: 3,
            profileImg: 'https://raw.githubusercontent.com/1ambda/1ambda.github.io/master/assets/images/redux/redux_logo.png?width=30%&height=30%',
        },
        {
            id: 6,
            name: '타스',
            grade: 3,
            profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
        },
        {
            id: 7,
            name: '싸쓰',
            grade: 3,
            profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png',
        },

    ];


    const [filter,setFilter] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(dummyData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudentInfo, selectStudentInfo] = useState([null,null,null,null]);
    const [selectedStudentID, setSelectedStudentID] = useState(null);
    const [studentList,setStudentList] = useState(dummyData)
    

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
      setSelectedStudentID(newStudent.id);
        selectStudentInfo([newStudent.name,newStudent.grade,newStudent.profileImg, newStudent.id])

    }; /*modal 에서 newStudent 를 받아 studentList 업데이트 후 해당 학생 선택상태는 StudentList 컴포넌트로, 정보는 StudentDetail 컴포넌트로 보낸다. */




    const showDetail = (selectedStudent) => {
        if(selectedStudent===null){
            selectStudentInfo(nullStudentInfo);
            setSelectedStudentID(null);

        } /*아무도 선택되지 않은 경우*/
        else {
            selectedStudent = studentList.filter((student) => (student.id === selectedStudent));
            selectStudentInfo([selectedStudent[0].name,selectedStudent[0].grade,selectedStudent[0].profileImg, selectedStudent[0].id])
            setSelectedStudentID(selectedStudent[0].id);

        }

    } /*studentItem 의 id 를 가져와서 대조 후, 해당 학생의 이름, 학년, 프로필 이미지 링크를 보내는 함수 */
    useEffect(()=>{},[selectedStudentInfo]); /*선택하자마자 info 를 보여주도록 하는 useEffect*/


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


    useEffect(()=>filterStudent(filter),[studentList,filter]); /*학생 추가시 리스트 동기화를 위해 useEffect 사용*/


  return (

    <div className="App">
        <Header />
        <Dashboard />

        <Modal toggleModal={toggleModal} addStudent={addStudent} modalVisible={modalVisible} studentList={studentList}/>



        <div className={"studentManage"}>
            <div className={"leftScreen"}>
                <div className="inputSection">
                    <Search filterStudent={filterStudent} setFilter={setFilter}/>
                    <StudentAdder toggleModal={toggleModal} />
                </div>

            <div className="studentList">
                <StudentList studentList={filteredStudents} showDetail={showDetail} selectedStudentID={selectedStudentID}/>
            </div>
        </div>
        <div className="verticalBorder">

        </div>
        <div className={"rightScreen"}>
            <StudentDetail selectedStudent={selectedStudentInfo} deleteStudent={deleteStudent} changeStudent={changeStudent} studentList={studentList}/>
        </div>

        </div>


    </div>

  );
}

export default App;
