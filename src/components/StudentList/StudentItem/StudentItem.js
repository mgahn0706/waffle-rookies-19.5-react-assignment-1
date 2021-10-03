import "./StudentItem.css"
import {useEffect, useState} from "react";

const StudentItem = ({item, showDetail, isSelected}) => {
    const [isChecked,setChecked] = useState(isSelected);
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

    const handleSelectButton = () => {
        setChecked(!isChecked);
        (isChecked ? showDetail(nullStudent) : showDetail(item))
    } /*버튼이 눌리면 checked 상태를 바꿔주고 on / off 에 따라 showDetail 에 학생정보를 보낸다*/

    useEffect(()=>{setChecked(isSelected)},[isSelected])
/* 외부에서 선택 여부가 바뀌면 바로 적용해주기 위함 ex) 다른 학생이 선택되어 선택이 취소됨*/




    return(

        <tr className={"studentRow"+(isChecked ? "selected" : "")} >
                <td className="studentName">
                    {item.name}
                </td>
                <td className="studentGrade">
                    {item.grade}
                </td>
                <td className={"blank"+(isChecked ? "Selected" : "")}>
                    <button className="selectionButton" onClick={()=> handleSelectButton()}> → </button>
                </td>
            </tr>

    );
}


export default StudentItem;