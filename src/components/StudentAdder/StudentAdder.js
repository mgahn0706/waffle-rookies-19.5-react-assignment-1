import "./StudentAdder.css";

const StudentAdder = ({toggleModal}) => {

    const handleAddButton = () => {
        toggleModal();
    } /*modal 을 켜는 함수 */

    return (
            <button className="mainAddButton" onClick={handleAddButton}>추가</button>

    );
}

export default StudentAdder;