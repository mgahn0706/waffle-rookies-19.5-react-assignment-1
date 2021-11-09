import './Confirm.css';
import { useSelectedStudentContext } from '../../../Context/StudentContext';
import { useHistory } from 'react-router-dom';
import WarningIcon from '../../../image/Warning.png';
import DeleteIcon from '../../../image/Delete.png';
import CancelIcon from '../../../image/Cancel.png';
import request from '../../../API/API';
import { toast } from 'react-toastify';

const Confirm = ({ selectedStudent, toggleConfirm, isConfirmVisible }) => {
  const { setSelectedStudent } = useSelectedStudentContext();
  const history = useHistory();
  const nullStudent = {
    id: null,
    name: null,
    grade: null,
    profile_img: null,
    email: null,
    phone: null,
    major: null,
    locked: false,
  };

  const deleteStudent = (id) => {
    request
      .delete(`/student/${id}`)
      .then(() => {
        toast.success(
          `${selectedStudent.name}(${selectedStudent.grade}학년)학생이 성공적으로 삭제되었습니다.`,
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
        );
      })
      .catch((err) => {
        toast.error(err.data.message, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setSelectedStudent(nullStudent);
  }; /*id를 받아서 해당 학생을 list 에서 삭제*/

  const handleDeleteButton = () => {
    history.replace('/students');
    deleteStudent(selectedStudent.id); /*id를 delete 함수에 넘겨줘서 삭제*/

    /*detail 창의 정보들을 name 을 빈칸으로 바꿔서 지움 */
  };

  const handleCancelButton = () => {
    toggleConfirm();
  };

  return (
    <div
      className={'confirmModalWrapper' + (isConfirmVisible ? 'visible' : '')}
    >
      <div className="confirmModal">
        <div className="confirmHeader">
          <img className="warningIcon" src={WarningIcon} alt="경고아이콘" />
          <span className="deleteStudentText">학생을 삭제합니다.</span>
        </div>
        <div className="warningText">이 작업은 되돌릴 수 없습니다.</div>

        <div className="confirmModalButton">
          <button className="cancelButton" onClick={() => handleCancelButton()}>
            <img src={CancelIcon} alt="취소아이콘" className="cancelIcon" />
            취소
          </button>
          <button className="confirmButton" onClick={handleDeleteButton}>
            <img src={DeleteIcon} alt="삭제아이콘" className="confirmIcon" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
