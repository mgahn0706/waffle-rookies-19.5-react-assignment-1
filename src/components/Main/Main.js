import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Search from '../Search/Search';
import StudentAdder from '../StudentAdder/StudentAdder';
import StudentList from '../StudentList/StudentList';
import { useEffect, useState } from 'react';
import StudentDetail from '../StudentDetail/StudentDetail';
import Modal from '../Modal/Modal';
import { useSelectedStudentContext } from '../../Context/StudentContext';
import request from '../../API/API';
import { toast } from 'react-toastify';
import PopUp from '../PopUp/PopUp';
import { useLoginContext } from '../../Context/LoginContext';
import styled from 'styled-components';

const AppWrapper = styled.div`
  margin: 42px;
`;
const InputSection = styled.div`
  width: 100%;
  float: left;
`;
const LeftScreen = styled.div`
  clear: both;
`;

const StudentManage = styled.div`
  width: 1352px;
  display: flex;
  justify-content: space-between;
`;

const RightScreen = styled.div`
  clear: both;
  width: 624px;
  height: 700px;
`;

const VerticalBorder = styled.div`
  height: 700px;
  width: 0;
  border: 1px solid #e4e4e4;
`;
const Main = () => {
  const { isTokenExpired } = useLoginContext();
  useEffect(() => {
    isTokenExpired();
  }, []); //토큰이 만료되면 로그아웃

  const nullStudent = {
    id: null,
    name: null,
    grade: null,
    profile_img: null,
  };

  const { selectedStudent, setSelectedStudent } = useSelectedStudentContext();
  const [studentList, setStudentList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request
      .get('/student')
      .then((response) => {
        setStudentList(response.data);
      })
      .catch(() => {
        toast.error('학생 리스트를 불러오지 못했습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; /*Modal 상태 변경*/

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
        );

        const addedStudent = {
          id: response.data.id,
          name: newStudent.name,
          grade: newStudent.grade,
          profile_img: '',
        };

        if (studentList !== undefined) {
          setStudentList([
            ...studentList,
            addedStudent,
          ]); /*서버 사용으로 의미는 없지만 추가하자마자 리스트에 생성되도록 함*/
        } else {
          setStudentList([addedStudent]);
        }
        setSelectedStudent(addedStudent);
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
        });
      });
  };

  const showDetail = (student) => {
    if (!student.id) {
      setSelectedStudent(nullStudent);
    } /*아무도 선택되지 않은 경우*/ else {
      if (studentList !== []) {
        //혹시 빈 배열이 올 것을 방지
        const selectedStudentList = studentList.filter(
          (item) => item.id === student.id
        );

        setSelectedStudent(selectedStudentList[0]);
      }
    }
  }; /*studentItem 의 id 를 가져와서 대조 후, 해당 학생의 이름, 학년, 프로필 이미지 링크를 보내는 함수 */

  const handleSelectStudent = (student) => {
    if (selectedStudent !== undefined) {
      const isChecked = selectedStudent.id && selectedStudent.id === student.id;
      isChecked ? showDetail(nullStudent) : showDetail(student);
    }
  }; /*버튼이 눌리면 checked 상태를 바꿔주고 on / off 에 따라 showDetail 에 학생정보를 보낸다*/

  return (
    <AppWrapper>
      <Header />
      <Dashboard studentList={studentList} />
      <PopUp />
      <Modal
        toggleModal={toggleModal}
        addStudent={addStudent}
        modalVisible={isModalVisible}
        studentList={studentList}
      />
      <StudentManage>
        <LeftScreen>
          <InputSection>
            <Search />
          </InputSection>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="studentList">
              <StudentList
                handleSelectStudent={handleSelectStudent}
                studentList={studentList}
                selectedStudent={selectedStudent}
              />
            </div>
          )}
          <StudentAdder toggleModal={toggleModal} />
        </LeftScreen>
        <VerticalBorder />
        <RightScreen>
          <StudentDetail selectedStudent={selectedStudent} />
        </RightScreen>
      </StudentManage>
    </AppWrapper>
  );
};

export default Main;
