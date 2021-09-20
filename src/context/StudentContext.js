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

const StudentContext = createContext(dummyData);
const FilterContext = createContext('');
const FilteredStudentContext = createContext(dummyData);

export const StudentProvider = ({children}) => {
    const [filter,setFilter] = useState("");
    const [selectedStudentID, setSelectedStudentID] = useState(null);
    const [studentList, setStudentList] = useState(dummyData)
    const [selectedStudentInfo, selectStudentInfo] = useState([null,null,null,null]);

    return (
        <StudentContext.Provider value={{studentList,setStudentList}}>
            <FilterContext.Provider value={{filter,setFilter}}>
            {children}
            </FilterContext.Provider>
        </StudentContext.Provider>
    )
};

export const useStudentContext = () => useContext(StudentContext);
export const useFilterContext = () => useContext(FilterContext);
export const useFilteredStudentsContext = () => useContext(FilteredStudentContext);