// Const Defines!!!
const INIT_STUDENTS = 'INIT_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

// action Methods
export const initStudents = (data)=> (
  {
    type: INIT_STUDENTS,
    data: data
  }
);

export const createStudent = (data)=> (
  {
    type: CREATE_STUDENT,
    data: data
  }
);

export default function studentReducer (students = [], action) {
  // I will add stuff here soon!
  let newStudents = [...students];
  switch(action.type) {
  case INIT_STUDENTS:
    newStudents = [...students, ...action.data];
    break;
  case CREATE_STUDENT:
    newStudents = [...students, action.data];
    break;
  }
  return newStudents;
}
