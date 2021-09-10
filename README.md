# 와플고등학교 명단관리 프로그램
### by mgahn0706(안민규)

<br>

### 개발환경
JetBrain Webstorm  2021.2 <br>


###Components (Used States)
<ul> 
    <li> Header </li>
    <li> DashBoard </li>
    <li> Modal (name, grade, profile: 추가하는 학생의 정보)</li>
    <li> Search</li>
    <li> StudentAdder</li>
    <li> StudentDetail (newName, newGrade, newProfile: 변경된 학생의 정보</li>
    <li> StudentList
        <ul>
            <li>StudentItem (isChecked: 선택버튼을 눌렀는지에 대한 상태)</li>
        </ul>
    </li>
    <ul>Status in App.js
        <li> (filter: Search 에서 가져온 filter 상태) </li>
        <li> (studentList: 데이터에 존재하는 학생 상태) </li>
        <li> (filteredStudents: filterStudent()함수가 완료된 학생 목록) </li>
        <li> (modalVisible: modal 이 보이는지에 대한 상태) </li>
        <li> (selectedStudentInfo: 선택된 학생의 정보) </li>
        <li> (selectedStudentID: 선택된 학생의 ID로 버튼을 안누르고 "선택"상태로 만들기 위함) </li>
    </ul>

</ul>

###Screenshots

![screenshot](./img/screenshot1.png)
메인화면

![screenshot](./img/screenshot(selected).png)
메인화면(선택됨)

![screenshot](./img/screenshot(modal).png)
학생 추가화면(modal)

###Notice
제출 직전 Issue 확인 결과 anti-pattern을 몇가지 발견함. (ex. isChecked는 isSelected라는 prop을 초기값으로 함)
assignment 2 시작 전에 점차 고쳐나갈 것이기 때문에 일부 State의 구성요소가 달라질 수 있습니다.



