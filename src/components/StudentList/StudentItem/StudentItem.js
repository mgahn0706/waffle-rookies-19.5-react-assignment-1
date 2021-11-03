import './StudentItem.css'

const StudentItem = ({ item, handleSelectStudent, isSelected }) => {
  return (
    <tr className={'studentRow' + (isSelected ? 'selected' : '')}>
      <td className="studentName">{item.name}</td>
      <td className="studentGrade">{item.grade}</td>
      <td className={'blank' + (isSelected ? 'Selected' : '')}>
        <button
          className="selectionButton"
          onClick={() => handleSelectStudent(item)}
        >
          {' '}
          →{' '}
        </button>
      </td>
    </tr>
  )
}

export default StudentItem
