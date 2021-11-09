import styled from "styled-components"
const MainAddButton = styled.button`
  height: 40px;
  width: 624px;
  left: 0;
  top: 0;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 15px;
  border-radius: 10px;
  transition: all 0.3s;`

const StudentAdder = ({ toggleModal }) => {
  const handleAddButton = () => {
    toggleModal()

  } /*modal 을 켜는 함수 */

  return (
    <MainAddButton onClick={handleAddButton}>
      추가
    </MainAddButton>
  )
}

export default StudentAdder
