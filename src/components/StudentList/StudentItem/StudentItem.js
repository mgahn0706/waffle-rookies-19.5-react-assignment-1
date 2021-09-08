import "./StudentItem.css"

const StudentItem = ({item}) => {
    return(

            <tr class="studentRow">
                <td className="studentName">
                    {item.name}
                </td>
                <td className="studentGrade">
                    {item.grade}
                </td>
                <td className="blank">

                </td>
            </tr>

    );
}


export default StudentItem;