import './StudentList.css';
import StudentItem from './StudentItem/StudentItem';
import { useLocation } from 'react-router-dom';

const StudentList = ({ handleSelectStudent, studentList, selectedStudent }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const name = params.get('name');
  const grade = params.get('grade');

  if (name) {
    studentList = studentList.filter((student) => student.name.includes(name));
  }

  if (grade) {
    studentList = studentList.filter((student) => {
      return student.grade === parseInt(grade);
    });
  }

  return studentList.length === 0 && !grade && !name ? (
    <div className="listSection">
      <table className="studentListSection">
        <thead>
          <tr className="listHeader">
            <th className="nameHeader">이름</th>
            <th className="gradeHeader">학년</th>
            <th className="blankHeader" />
          </tr>
        </thead>
      </table>

      <div className="emptyListSection">학교에 학생이 없어요 :(</div>
    </div>
  ) : (
    <div className="listSection">
      <table className="studentListSection">
        <thead>
          <tr className="listHeader">
            <th className="nameHeader">이름</th>
            <th className="gradeHeader">학년</th>
            <th className="blankHeader" />
          </tr>
        </thead>
        <tbody>
          {studentList.map(
            (item) => (
              <StudentItem
                key={item.id}
                item={item}
                handleSelectStudent={handleSelectStudent}
                isSelected={selectedStudent.id === item.id}
              />
            )
            /*만약 새로 추가된 학생이라면 initial state 를 selected 되게 하도록 설정한다.*/
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
