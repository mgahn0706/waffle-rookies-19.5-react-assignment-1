import './App.css';
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Search from "./components/Search/Search";
import StudentAdder from "./components/StudentAdder/StudentAdder";
import StudentList from "./components/StudentList/StudentList";
import {useState} from "react";
import StudentDetail from "./components/StudentDetail/StudentDetail";
import Modal from "./components/Modal/Modal";

function App() {
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

    const [studentList, setStudentList] = useState(dummyData);
    const [filteredStudents, setFilteredStudents] = useState(dummyData);

    const [modalVisible, setModalVisible] = useState(false);

    const filterStudent = (filter) => {

        if(filter===''){
            setFilteredStudents(studentList);
        }
        else{
            const filteredStudents =studentList.filter((student)=>student.name.includes(filter))
            setFilteredStudents(filteredStudents);
        }

    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };


    const addStudent = () => {
      
    }

  return (
    <div className="App">
        <Header />
        <Dashboard />

        {modalVisible === true ? <Modal toggleModal={toggleModal} /> : <div />}

        <div className={"studentManage"}>
            <div className={"leftScreen"}>
                <div className="inputSection">
                    <Search filterStudent={filterStudent}/>
                    <StudentAdder toggleModal={toggleModal} />
                </div>

            <div className="studentList">
                <StudentList studentList={filteredStudents}/>
            </div>
        </div>
        <div className={"verticalBorder"}>

        </div>
        <div className={"rightScreen"}>
            <StudentDetail />
        </div>

        </div>


    </div>

  );
}

export default App;
