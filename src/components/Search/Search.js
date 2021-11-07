import './Search.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Search = ({ setFilter }) => {
  const history = useHistory()
  const [name, setName] = useState()
  const [grade, setGrade] = useState() //url 설정을 위해 입력된 값을 저장하는 state

  const handleSearchButton = () => {
    if (grade && name) {
      history.push(`?name=${name}&grade=${grade}`)
    } else if (!name && grade) {
      history.push(`?grade=${grade}`)
    } else if (!grade && name) {
      history.push(`?name=${name}`)
    } else {
      history.push('/students')
    }
  }

  const SearchSection = styled.div`
    width: 630px;
  `

  return (
    <SearchSection>
      <input
        className="search"
        placeholder={'이름'}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="search"
        placeholder={'학년'}
        onChange={(e) => setGrade(e.target.value)}
      />

      <button className="searchButton" onClick={handleSearchButton}>
        검색
      </button>
    </SearchSection>
  )
}

export default Search
