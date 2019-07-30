import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
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

function SchoolCards ({students, schools, user}) {
  const userRole = user.role;
  return (
    <div className='cards-list'>
      {
        schools.map((school)=>{
          return (
            <div className='single-card' key={school.id}>
              <Link to={`/schools/${school.id}`}>{school.name}</Link><br/>
              <img src={school.imageLocation} /><br/>
              Student Count {studentInSchoolList(students, school.id).length}<br/>
              {userRole === 'admin' ? <StudentSelect students={students} schoolId={school.id} defaultValue='--Add Student--' handleChange={changeStudent} /> : null}
            </div>
          );
        })
      }
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students,
  user: state.user
});

export default connect(mapStateToProps)(SchoolCards);
