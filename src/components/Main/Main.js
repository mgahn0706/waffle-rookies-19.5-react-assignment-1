import './Main.css'
import Header from '../Header/Header'
import Dashboard from '../Dashboard/Dashboard'
import Search from '../Search/Search'
import StudentAdder from '../StudentAdder/StudentAdder'
import StudentList from '../StudentList/StudentList'
import { useEffect, useState } from 'react'
import StudentDetail from '../StudentDetail/StudentDetail'
import Modal from '../Modal/Modal'
import { useSelectedStudentContext } from '../../Context/StudentContext'
import request from '../../API/API'
import { toast } from 'react-toastify'
import PopUp from '../PopUp/PopUp'
import StudentPage from '../StudentPage/StudentPage'
import { useLoginContext } from '../../Context/LoginContext'
import { useLocation } from 'react-router-dom'
const Main = () => {
  const { isTokenExpired } = useLoginContext()

  useEffect(() => {
    isTokenExpired()
  }, []) //토큰이 만료되면 로그아웃

  const nullStudent = {
    id: null,
    name: null,
    grade: null,
    profile_img: null,
  }

  const { selectedStudent, setSelectedStudent } = useSelectedStudentContext()
  const [studentList, setStudentList] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    request
      .get('/student')
      .then((response) => {
        setStudentList(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  } /*Modal 상태 변경*/

  const addStudent = (newStudent) => {
    request
      .post('/student', {
        name: newStudent.name,
        grade: Number(newStudent.grade),
      })
      .then((response) => {
        toast.success(
          `${newStudent.name}(${newStudent.grade}학년) 학생이 성공적으로 추가되었습니다.`,
          {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          }
        )

        const addedStudent = {
          id: response.data.id,
          name: newStudent.name,
          grade: newStudent.grade,
          profile_img: null,
        }
        setStudentList([
          ...studentList,
          addedStudent,
        ]) /*서버 사용으로 의미는 없지만 추가하자마자 리스트에 생성되도록 함*/
        setSelectedStudent(addedStudent)
      })
      .catch((err) => {
        toast.error(err.message, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const showDetail = (student) => {
    if (!student.id) {
      setSelectedStudent(nullStudent)
    } /*아무도 선택되지 않은 경우*/ else {
      const selectedStudentList = studentList.filter(
        (item) => item.id === student.id
      )
      setSelectedStudent(selectedStudentList[0])
    }
  } /*studentItem 의 id 를 가져와서 대조 후, 해당 학생의 이름, 학년, 프로필 이미지 링크를 보내는 함수 */

  const handleSelectStudent = (student) => {
    const isChecked = selectedStudent.id && selectedStudent.id === student.id
    isChecked ? showDetail(nullStudent) : showDetail(student)
  } /*버튼이 눌리면 checked 상태를 바꿔주고 on / off 에 따라 showDetail 에 학생정보를 보낸다*/

  return (
    <div className="App">
      (
      <StudentPage handleSelection={handleSelectStudent} />
      )}
      <Header />
      <Dashboard studentList={studentList} />
      <PopUp />
      <Modal
        toggleModal={toggleModal}
        addStudent={addStudent}
        modalVisible={isModalVisible}
        studentList={studentList}
      />
      <div className="studentManage">
        <div className="leftScreen">
          <div className="inputSection">
            <Search setFilter={setFilter} />
          </div>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="studentList">
              <StudentList
                filter={filter}
                handleSelectStudent={handleSelectStudent}
                studentList={studentList}
                selectedStudent={selectedStudent}
              />
            </div>
          )}
          <StudentAdder toggleModal={toggleModal} />
        </div>
        <div className="verticalBorder" />
        <div className="rightScreen">
          <StudentDetail selectedStudent={selectedStudent} />
        </div>
      </div>
    </div>
  )
}

export default Main
