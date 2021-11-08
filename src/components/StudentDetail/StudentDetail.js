import './StudentDetail.css'
import detailView from '../../image/DetailView.png'
import { useHistory } from 'react-router-dom'

const StudentDetail = ({ selectedStudent }) => {
  const history = useHistory()

  const handleDetailButton = () => {
    const url = '/student/' + selectedStudent.id
    return history.push(url)
  }

  return (
    <div className="studentDetail">
      <div
        className={
          'selectedScreen' + (selectedStudent.id === null ? 'Hidden' : '')
        }
      >
        왼쪽 표에서 학생을 선택해 주세요.
      </div>

      <div className="detailContent">
        <div className="detailButtonWrapper">
          <img
            className="detailButton"
            onClick={() => handleDetailButton()}
            src={detailView}
            alt="상세 보기"
          />
        </div>
        <div className="profilePreview">
          <img
            className="profileImage"
            src={selectedStudent.profile_img}
            alt="프로필 이미지를 찾을 수 없습니다."
          />
        </div>
        <div className="detailInformation">
          <div className="nameChange">
            <span className="namePreviewText">이름</span>
            <input
              className="namePreview"
              value={selectedStudent.name || ''}
              disabled
            />
          </div>

          <div className="gradeChange">
            <span className="gradePreviewText">학년</span>
            <input
              className="gradePreview"
              value={selectedStudent.grade || ''}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
