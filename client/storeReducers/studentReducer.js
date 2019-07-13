// Const Defines!!!
const INIT_STUDENTS = 'INIT_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const PUT_STUDENT = 'UPDATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';

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

export const putStudent = (id, school)=> (
  {
    type: PUT_STUDENT,
    id: id,
    schoolId: school
  }
);

export const deleteStudent = (id)=> (
  {
    type: DESTROY_STUDENT,
    id: id
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
  case PUT_STUDENT:
    newStudents = newStudents.map((s)=>{
      if(s.id === action.id){
        s.schoolId = action.schoolId;
      }
      return s;
    });
    break;
  case DESTROY_STUDENT:
    newStudents = students.filter((s)=> s.id !== action.id);
    break;
  }
  return newStudents;
}
