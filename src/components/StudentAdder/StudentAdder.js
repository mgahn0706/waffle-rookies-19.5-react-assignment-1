import "./StudentAdder.css";

const StudentAdder = ({toggleModal}) => {

    const handleAddButton = () => {
        toggleModal();
    }

    return (
            <button className={"mainAddButton"} onClick={handleAddButton}>추가</button>

    );
}

export default StudentAdder;