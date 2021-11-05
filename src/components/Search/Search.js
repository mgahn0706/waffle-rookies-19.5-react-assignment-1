import './Search.css'

const Search = ({ setFilter }) => {
  const handleFilter = (e) => {
    setFilter(e.target.value)
    /*필터링 상태에서 studentList 가 변경될 경우 filter 를 바로 주어야하기 때문에 setter 를 부모에서 가져온다. */
  } /*입력이 변할 때 마다 필터 해준다.*/
  return (
    <div>
      <input className="search" placeholder={'이름'} />
      <input className="search" placeholder={'학년'} />

      <button className="searchButton">검색</button>
    </div>
  )
}

export default Search
