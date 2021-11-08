import './StudentPage.css'
import { useEffect, useRef, useState } from 'react'
import { useSelectedStudentContext } from '../../Context/StudentContext'
import { useHistory, useParams } from 'react-router-dom'
import Confirm from './Confirm/Confirm'
import DeleteIcon from '../../image/Delete.png'
import LockIcon from '../../image/Lock.png'
import SaveIcon from '../../image/Save.png'
import UnlockIcon from '../../image/Unlock.png'
import { toast } from 'react-toastify'
import request from '../../API/API'
import Comments from './Comments/Comments'
import { useLoginContext } from '../../Context/AuthContext'

const StudentPage = () => {
  const { isTokenExpired } = useLoginContext()
  const scroller = useRef()

  useEffect(() => {
    isTokenExpired()
  }, [])
  const { setSelectedStudent } = useSelectedStudentContext()

  const params = useParams()
  const history = useHistory()

  const [selectedStudent, selectStudent] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [originalData, setOriginalData] = useState({})

  useEffect(() => {
    setLoading(true)
    request
      .get(`/student/${params.id}`)
      .then((response) => {
        selectStudent(response.data)
        setOriginalData(response.data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('학생 정보를 불러오지 못했습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setLoading(false)
      })
  }, [])

  /*주소창에 id를 직접 입력하는 경우를 대비하여 selectedStudent 에서 가져오지 않고 id 에서 useParams 를 이용*/

  const [newProfile, setNewProfile] = useState(null)
  const [newPhone, setNewPhone] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [newMajor, setNewMajor] = useState(null)
  const [isConfirmVisible, setConfirmVisible] = useState(false)
  const [isLocked, setLocked] =
    useState(
      false
    ) /*일일히 .locked 치기도 번거로우며 렌더가 잘 안돼서 따로 뺐음*/
  const [commentList, setCommentList] = useState([])
  const [comment, setComment] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const formatEmail = (email) => {
    if (!email) {
      return null /*email 안정해진 경우 그냥 빈칸 출력*/
    } else {
      return selectedStudent.email.slice(0, selectedStudent.email.indexOf('@'))
    }
  }

  useEffect(() => setLocked(selectedStudent.locked), [selectedStudent.locked])
  useEffect(() => setNewProfile(selectedStudent.profile_img), [selectedStudent])
  useEffect(() => setNewPhone(selectedStudent.phone), [selectedStudent])
  useEffect(
    () => setNewEmail(formatEmail(selectedStudent.email)),
    [selectedStudent]
  )
  useEffect(() => setNewMajor(selectedStudent.major), [selectedStudent])

  const handleHomeButton = () => {
    history.goBack()
  }

  const sortComment = () => {
    commentList.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return 1
      } else if (a.datetime < b.datetime) {
        return -1
      } else {
        return 0
      }
    })
  } //시간에 따라 sorting 하는 함수,

  const handleSaveButton = () => {
    const formattedEmail = newEmail ? newEmail + '@waffle.hs.kr' : null //API 에 맞춰서 포매팅
    request
      .patch(`/student/${params.id}`, {
        ...(newProfile !== originalData.profile_img && {
          profile_img: newProfile,
        }),
        ...(formattedEmail !== originalData.email && { email: formattedEmail }),
        ...(newPhone !== originalData.phone && { phone: newPhone }),
        ...(newMajor !== originalData.major && { major: newMajor }), //바뀐 내용만 patch
      })
      .then(() => {
        toast.success('변경사항이 저장되었습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })

        setSelectedStudent({
          id: selectedStudent.id,
          grade: selectedStudent.grade,
          name: selectedStudent.name,
          profile_img: newProfile,
        })

        setOriginalData({
          id: params.id,
          grade: selectedStudent.grade,
          name: selectedStudent.name,
          locked: isLocked,
          major: newMajor,
          phone: newPhone,
          profile_img: newProfile,
          email: formattedEmail,
        })

        fetchComment()
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

  const toggleConfirm = () => {
    setConfirmVisible(!isConfirmVisible)
    /*modal 창 띄우기 */
  }

  const handleLockButton = () => {
    if (!isLocked) {
      setLocked(true)
      request
        .post(`student/${params.id}/lock`)
        .then(() => {
          fetchComment()
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
    } else {
      setLocked(false)
      request
        .post(`student/${params.id}/unlock`)
        .then(() => {
          fetchComment()
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
    } /*잠금버튼 함수*/
  }

  const handlePhoneInput = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setNewPhone(formattedPhone)
  }

  const formatPhoneNumber = (number) => {
    if (number === null) {
      return number
    }

    const phone = number.replace(/[^\d]/g, '')
    const phoneLength = phone.length

    if (phoneLength < 4) {
      return phone
    } else if (phoneLength < 8) {
      return phone.slice(0, 3) + '-' + phone.slice(3)
    } else if (phoneLength < 12) {
      return phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7)
    } else {
      return (
        phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7, 11)
      )
    }
  }

  const handleWriteButton = () => {
    setComment('') /*입력값 초기화*/
    request
      .post(`/student/${params.id}/comment`, {
        content: comment,
      })
      .then(() => {
        fetchComment()
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
      }) /*comment 를 post 로 보냄*/
  }

  useEffect(() => {
    fetchComment()
  }, [])

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWriteButton()
    }
  } /*Enter 만 쳐도 댓글을 달 수 있게*/

  const handleScroll = () => {
    if (
      scroller.current.scrollHeight -
        scroller.current.scrollTop -
        scroller.current.clientHeight <
      300 //부드럽게 연결하기 위해 적당한 위치에서 미리 load
    ) {
      pagination()
    }
  }

  const pagination = () => {
    request
      .get(`/student/${params.id}/comment`, {
        params: { page: currentPage },
      })
      .then((response) => {
        if (response.data.next) {
          setCurrentPage(response.data.next)
          setCommentList([...commentList, ...response.data.data])
        }
      })
  }
  //상태 변경 시 comment 불러오고 페이지네이션 초기화
  const fetchComment = () => {
    setCommentList([])
    request
      .get(`/student/${params.id}/comment`, {
        params: { page: 1 },
      })
      .then((response) => {
        setCurrentPage(response.data.next)
        const temp = [...response.data.data]
        setCommentList(temp)
        console.log(response.data.data[0])
      })
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className="studentPage">
        <div className="pageHeader">
          <button className="homeButton" onClick={() => handleHomeButton()}>
            ← 학생 목록 페이지로
          </button>
        </div>

        <Confirm
          selectedStudent={selectedStudent}
          toggleConfirm={() => toggleConfirm()}
          isConfirmVisible={isConfirmVisible}
        />
        {isLocked ? (
          <div className="pageButton">
            <button className="lockButton" onClick={() => handleLockButton()}>
              <img src={LockIcon} alt="잠금아이콘" className="lockIcon" />
              해제
            </button>
            <button className="disabledButton">
              <img src={DeleteIcon} alt="삭제아이콘" className="deleteIcon" />
              삭제
            </button>
            <button className="disabledButton">
              <img src={SaveIcon} alt="저장아이콘" className="saveIcon" />
              저장
            </button>
          </div>
        ) : (
          <div className="pageButton">
            <button className="lockButton" onClick={() => handleLockButton()}>
              <img src={UnlockIcon} alt="잠금해제아이콘" className="lockIcon" />
              잠금
            </button>
            <button className="deleteButton" onClick={() => toggleConfirm()}>
              <img src={DeleteIcon} alt="삭제아이콘" className="deleteIcon" />
              삭제
            </button>
            <button className="saveButton" onClick={() => handleSaveButton()}>
              <img src={SaveIcon} alt="저장아이콘" className="saveIcon" />
              저장
            </button>
          </div>
        )}

        <div className="infoWrapper">
          <div className="pageContent">
            <div className="profileBox">
              <img
                className="profileImage"
                src={newProfile}
                alt="프로필 이미지를 찾을 수 없습니다."
              />
            </div>
            <div className="immutableInformation">
              <div className="nameChange">
                <span className="nameChangeText">이름</span>
                <input
                  className="nameChangeInput"
                  value={selectedStudent.name || ''}
                  disabled
                />
              </div>

              <div className="gradeChange">
                <span className="gradeChangeText">학년</span>
                <input
                  className="gradeChangeInput"
                  value={selectedStudent.grade || ''}
                  disabled
                />
              </div>
            </div>
            <div className="informationIcon">정보</div>

            <div className="informationSection">
              {isLocked ? (
                <div className="lockedScreen">
                  <img className="lockImg" src={LockIcon} alt="자물쇠 아이콘" />
                  수정하려면 잠금을 해제하세요.
                </div>
              ) : (
                <div> </div>
              )}

              <div className="phoneChange">
                <span className="phoneChangeText">전화번호</span>
                <input
                  className="phoneChangeInput"
                  value={newPhone || ''}
                  onChange={(e) => handlePhoneInput(e)}
                />
              </div>
              <div className="emailChange">
                <span className="emailChangeText">이메일</span>
                <span className="emailSuffix">@waffle.hs.kr</span>
                <input
                  className="emailChangeInput"
                  value={newEmail || ''}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="majorChange">
                <span className="majorChangeText">전공</span>
                <select
                  className="majorInput"
                  defaultValue={selectedStudent.major}
                  onChange={(e) => setNewMajor(e.target.value)}
                >
                  <option value="frontend">frontend</option>
                  <option value="backend">backend</option>
                  <option value="android">android</option>
                  <option value="iOS">iOS</option>
                </select>
              </div>

              <div className="profileChange">
                <span className="profileChangeText">프로필</span>
                <input
                  className="profileChangeInput"
                  value={newProfile || ''}
                  onChange={(e) => setNewProfile(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="commentSection">
            <div className="commentIcon">코멘트</div>
            <div
              className="commentList"
              ref={scroller}
              onScroll={() => handleScroll()}
            >
              {commentList.map((item) => (
                <Comments item={item} key={item.datetime} />
              ))}
            </div>
            <div className="commentInputSection">
              <input
                className="commentInput"
                onKeyPress={onKeyPress}
                placeholder="댓글을 작성하세요."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                }}
              />
              <button className="commentButton" onClick={handleWriteButton}>
                작성
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentPage
