import "./StudentPage.css";
import {useParams} from "react-router-dom";

const StudentPage = () => {
    const params = useParams();

    return <h1> {params.id} </h1>
}

export default StudentPage;