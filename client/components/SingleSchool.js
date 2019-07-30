import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import SingleStudent from './SingleStudent';
import {StudentSelect} from './sharedComponents';
import store from '../store';
import {updateStudent} from '../storeReducers/studentReducer';
import {studentInSchoolList} from './sharedFunctions/computation';

async function changeStudent(studentId, schoolId){
  try{
    const success = await axios.put(`/api/students/${studentId}`, `schoolId=${schoolId}`);
    store.dispatch(updateStudent(studentId, schoolId));
  }
  catch(e){
    console.log(e);
  }
}

function SingleSchool ({students, schools, user, match}) {
  const userRole = user.role;  
  const school = schools.filter(s => s.id === match.params.id)[0];
  const listStudents = students.filter((s)=> s.schoolId === school.id);
  if (school === undefined) return null;
  return (
    <div>
      <Header />
      {userRole === 'admin' ? <StudentForm /> : null}
      <div className='single-school'>
        <h1>{school.name} ({studentInSchoolList(students, school.id).length} Students enrolled)</h1>
        <img src={school.imageLocation} /><br/>
      {userRole === 'admin' ? <StudentSelect students={students} schoolId={school.id} defaultValue='--Transfer Student--' handleChange={changeStudent}/> : null}
      </div>
      <div className='cards-list'>
      {userRole !== 'guest' ? listStudents.map((s)=> <SingleStudent key={s.id} student={s} schools={schools} userRole={userRole}/>) : null}
    </div>
      </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students,
  user: state.user
});

export default connect(mapStateToProps)(SingleSchool);
