// Const Defines!!!
const INIT_STUDENTS = 'INIT_STUDENTS';

// action Methods
export const initStudents = (data)=> (
  {
    type: INIT_STUDENTS,
    data: data
  }
);

export default function studentReducer (students = [], action) {
  // I will add stuff here soon!
  let newStudents = [...students];
  switch(action.type) {
  case INIT_STUDENTS:
    newStudents = [...students, ...action.data];
  }
  return newStudents;
}
