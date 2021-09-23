import "./StudentDetail.css";
import detailView from "../../image/DetailView.png"
import {useHistory} from "react-router-dom";
import {useSelectedStudentContext} from "../../Context/StudentContext";


const StudentDetail = () => {

    const history=useHistory();
    const {selectedStudent} = useSelectedStudentContext();


    const handleDetailButton = () => {
        const url = '/student/'+selectedStudent.id; /*url 뒤에 선택된 학생의 id를 붙여줌. 아직은 숫자만 있어서 오류는 안나는데 불확실*/
        return(
            history.push(url)
        );
    }
    return (

        <div className="studentDetail">
            <div className={"selectedScreen"+(selectedStudent.id===null ? "Hidden" : "")}>
                왼쪽 표에서 학생을 선택해 주세요.
            </div>

            <div className="detailContent">
                <div className="detailButtonWrapper">
                    <img className="detailButton" onClick={()=>handleDetailButton()} src={detailView} alt="상세 보기"/>
                </div>
                <div className="profileBox">
                    <img className="profileImage" src={selectedStudent.profile_img} alt="프로필 이미지를 찾을 수 없습니다."/>
                </div>
                <div className="detailInformation">
                    <div className="nameChange">
                        <span className="nameChangeText">이름</span>
                        <input className="nameChangeInput" value={selectedStudent.name || ''} disabled />
                    </div>

                    <div className="gradeChange">
                        <span className="gradeChangeText">학년</span>
                        <input className="gradeChangeInput" value={selectedStudent.grade || ''} disabled />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;