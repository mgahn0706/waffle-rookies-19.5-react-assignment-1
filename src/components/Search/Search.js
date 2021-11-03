import './Search.css'

const Search = ({ filterStudent, setFilter }) => {
  const handleFilter = (e) => {
    filterStudent(e.target.value)
    setFilter(e.target.value)
    /*필터링 상태에서 studentList 가 변경될 경우 filter 를 바로 주어야하기 때문에 setter 를 부모에서 가져온다. */
  } /*입력이 변할 때 마다 필터 해준다.*/
  return (
    <input
      className="search"
      placeholder={'검색'}
      onChange={(e) => handleFilter(e)}
    />
  )
}

export default Search
