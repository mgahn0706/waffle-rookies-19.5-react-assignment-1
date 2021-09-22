import {createContext, useContext, useState} from "react";

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

const nullStudent = {
    "id": null,
    "name": null,
    "grade": null,
    "profile_img": null,
    "email": null,
    "phone": null,
    "major": null,
    "locked": false
}

const StudentContext = createContext(dummyData);
const FilterContext = createContext('');
const SelectedStudentContext = createContext(nullStudent);

export const StudentProvider = ({children}) => {
    const [filter,setFilter] = useState("");
    const [studentList, setStudentList] = useState(dummyData);
    const [selectedStudent,setSelectedStudent] = useState(nullStudent);
    return (
        <StudentContext.Provider value={{studentList,setStudentList}}>
            <FilterContext.Provider value={{filter,setFilter}}>
                <SelectedStudentContext.Provider value={{selectedStudent,setSelectedStudent}}>
                    {children}
                </SelectedStudentContext.Provider>
            </FilterContext.Provider>
        </StudentContext.Provider>
    )
};

export const useStudentContext = () => useContext(StudentContext);
export const useFilterContext = () => useContext(FilterContext);
export const useSelectedStudentContext = () => useContext(SelectedStudentContext);
