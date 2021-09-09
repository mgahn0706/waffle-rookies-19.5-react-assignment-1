import "./StudentItem.css"
import {useEffect, useState} from "react";

const StudentItem = ({item, showDetail}) => {


    const [isChecked,setChecked] = useState(false);

    const handleSelectButton = () => {

        setChecked(!isChecked);
        (isChecked ? showDetail(null) : showDetail(item.id))


    }




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