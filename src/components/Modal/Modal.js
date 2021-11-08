import './Modal.css'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Modal = ({ toggleModal, addStudent, modalVisible, studentList }) => {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState()

  const resetInput = () => {
    setName('')
    setGrade(0)
  }

  const handleCloseButton = () => {
    toggleModal() /*Modal status update */
    resetInput()
  }

  const handleAddButton = () => {
    if (grade === '1' || grade === '2' || grade === '3') {
      setGrade(parseInt(grade))
    }

    const newStudent = {
      name: name,
      grade: grade,
    }

    const sameNameStudent = studentList.find(
      (item) => item.name === newStudent.name
    )

    const regex = /^[가-힣|]+$/

    if (!regex.test(name)) {
      toast.error('이름은 온전한 한글로만 입력할 수 있습니다.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } /*영어나 자음만 입력할 경우 걸러줌*/ else if (
      !(grade in ['1', '2', '3', 1, 2, 3]) ||
      (name.length !== 2 && name.length !== 3)
    ) {
      toast.error('이름 또는 학년이 올바르지 않습니다.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (sameNameStudent === undefined) {
      addStudent(newStudent)
      resetInput()
      toggleModal() /* addStudent 에 newStudent 를 보냄 + 입력창 초기화 및 Modal state 를 변경. */
    } /*이름 같은 사람이 아예없고 입력도 적절한 경우*/ else if (
      sameNameStudent.grade === Number(newStudent.grade) ||
      sameNameStudent.grade === newStudent.grade
    ) {
      toast.error(`이미 ${sameNameStudent.grade}학년에 동명이인이 있습니다.`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (
      (name.length === 2 || name.length === 3) &&
      grade in ['1', '2', '3', 1, 2, 3]
    ) {
      addStudent(newStudent)
      resetInput()
      toggleModal()
    } /*이름은 같지만 동명이인이 아니고 입력이 적절한 경우*/ else {
      toast.error('이름 또는 학년이 올바르지 않습니다.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } /*입력 형식이 맞지 않는 경우*/
  }

  return (
    <div className={'modalWrapper' + (modalVisible ? 'visible' : '')}>
      <div className="modal">
        <div className="modalName">
          <span className="textName"> 이름 </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputName"
          />
        </div>
        <div className="modalGrade">
          <span className="textGrade"> 학년 </span>
          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="inputGrade"
          />
        </div>

        <div className="modalButton">
          <button className="closeButton" onClick={handleCloseButton}>
            닫기
          </button>
          <button className="addButton" onClick={handleAddButton}>
            추가
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
