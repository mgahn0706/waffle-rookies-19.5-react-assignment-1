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
                    <button className="selectionButton">-></button>
                </td>
            </tr>

    );
}


export default StudentItem;