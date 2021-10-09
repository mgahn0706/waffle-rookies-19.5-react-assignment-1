import {createContext, useContext, useEffect, useState} from "react";
import request from "../API/API";
import {toast} from "react-toastify";


const dummyData = [
    {
        "id": 1,
        "name": "깃허브",
        "grade": 1,
        "profile_img": "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
        "email": "test@waffle.hs.kr",
        "phone": "000-0000-0000",
        "major": "frontend",
        "locked": false,
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
const LoginContext = createContext(null);

export const StudentProvider = ({children}) => {
    const [filter,setFilter] = useState("");
    const [studentList, setStudentList] = useState(dummyData);
    const [selectedStudent,setSelectedStudent] = useState(nullStudent);
    const [userToken, setUserToken] = useState(undefined);



    useEffect(()=>{
        setUserToken(localStorage.getItem('token'));
    },[])

    const login = (usernameInput, passwordInput) => {
        request.post('/auth/login',{
            "username" : usernameInput,
            "password" : passwordInput,
        })
            .then((response)=>{
                const temp = response.data.access_token;
                localStorage.setItem('token',temp);
                setUserToken(temp);
                request.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

            })
            .catch(()=>{
                toast.error('유저네임이나 비밀번호가 잘못되었습니다.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const logout = () => {
        delete request.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        setUserToken(null);


    }




    return (
        <StudentContext.Provider value={{studentList,setStudentList}}>
            <FilterContext.Provider value={{filter,setFilter}}>
                <SelectedStudentContext.Provider value={{selectedStudent,setSelectedStudent}}>
                    <LoginContext.Provider value={{userToken, login, logout, setUserToken}}>
                        {children}
                    </LoginContext.Provider>


                </SelectedStudentContext.Provider>
            </FilterContext.Provider>
        </StudentContext.Provider>
    )
};

export const useStudentContext = () => useContext(StudentContext);
export const useFilterContext = () => useContext(FilterContext);
export const useSelectedStudentContext = () => useContext(SelectedStudentContext);
export const useLoginContext = () => useContext(LoginContext);