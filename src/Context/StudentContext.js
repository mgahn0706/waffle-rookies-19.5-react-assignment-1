import { createContext, useContext, useState } from 'react'

const nullStudent = {
  id: null,
  name: null,
  grade: null,
  profile_img: null,
  email: null,
  phone: null,
  major: null,
  locked: false,
}

const SelectedStudentContext = createContext(nullStudent)

export const StudentProvider = ({ children }) => {
  const [selectedStudent, setSelectedStudent] = useState(nullStudent)

  return (
    <SelectedStudentContext.Provider
      value={{ selectedStudent, setSelectedStudent }}
    >
      {children}
    </SelectedStudentContext.Provider>
  )
}

export const useSelectedStudentContext = () =>
  useContext(SelectedStudentContext)
