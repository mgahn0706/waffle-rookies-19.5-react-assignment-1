import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchInput = styled.input`
   {
    height: 20px;
    width: 120px;
    margin-right: 10px;
  }
`;

const SearchButton = styled.button`
   {
    height: 30px;
    width: 100px;
    left: 0;
    top: 0;
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
    float: right;
    transition: all 0.3s;
  }
`;

const SearchSection = styled.div`
   {
    width: 600px;
  }
`;

const Search = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [grade, setGrade] = useState(); //url 설정을 위해 입력된 값을 저장하는 state

  const handleSearchButton = () => {
    if (grade && name) {
      history.push(`?name=${name}&grade=${grade}`);
    } else if (!name && grade) {
      history.push(`?grade=${grade}`);
    } else if (!grade && name) {
      history.push(`?name=${name}`);
    } else {
      history.push('/students');
    }
  };

  useEffect(() => {}, [grade, name]);

  return (
    <SearchSection>
      <SearchInput
        placeholder={'이름'}
        onChange={(e) => setName(e.target.value)}
      />
      <SearchInput
        placeholder={'학년'}
        onChange={(e) => setGrade(e.target.value)}
      />

      <SearchButton onClick={handleSearchButton}>검색</SearchButton>
    </SearchSection>
  );
};

export default Search;
