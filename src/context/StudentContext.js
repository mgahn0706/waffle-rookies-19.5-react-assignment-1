import {createContext, useContext, useEffect, useState} from "react";

const dummyData = [
    {
        "id": 1,
        "name": "깃허브",
        "grade": 1,
        "profile_img": "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
        "email": "test@waffle.hs.kr",
        "phone": "000-0000-0000",
        "major": "frontend",
        "locked": true
    }
]

const StudentContext = createContext(dummyData);

export const StudentProvider = ({children}) => {
    const nullStudentInfo = [null,null,null,null];
    const [selectedStudentID, setSelectedStudentID] = useState(null);
    const [studentList, setStudentList] = useState(dummyData)
    const [selectedStudentInfo, selectStudentInfo] = useState([null,null,null,null]);
    const [filteredStudents, setFilteredStudents] = useState(dummyData);
    const filterStudent = (filter) => {
        /*바뀐 student 정보를 받아서 해당 학생과 id가 일치하는 학생 정보를 갱신함 */
    }

    return (
        <StudentContext value={{studentList, selectedStudentID, selectedStudentInfo}}>
            {children}
        </StudentContext>
    )
};

export const useStudentContext = () => useContext(StudentContext);