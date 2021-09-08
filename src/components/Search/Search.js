import "./Search.css";
import {useState} from "react";



const Search = ({filterStudent}) => {

    const [filter,setFilter] = useState("");

    const handleFilter = (e) => {
        setFilter(e.target.value);
        filterStudent(e.target.value);
    }
    return (
        <input className={"search"} placeholder={"검색"} value={filter} onChange={(e)=> handleFilter(e)}/>
    );
}

export default Search;