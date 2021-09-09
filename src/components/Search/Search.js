import "./Search.css";
import {useState} from "react";



const Search = ({filterStudent, setFilter}) => {


    const handleFilter = (e) => {

        filterStudent(e.target.value);
        setFilter(e.target.value);

    }
    return (
        <input className="search" placeholder={"검색"} onChange={(e)=> handleFilter(e)}/>
    );
}

export default Search;