import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import SchoolSelect from './sharedComponents/SchoolSelect';
import store from '../store';
import {putStudent, deleteStudent} from '../storeReducers/studentReducer';

async function updateStudent(e){
  const {name, value} = e.target;
  const id = e.target.parentNode.querySelector('button').id;
  try{
    const success = await axios.put(`/api/students/${id}`, `schoolId=${value}`);
    store.dispatch(putStudent(id, value));
  }
  catch(e){
    console.log(e);
  }
}

async function destroyStudent(e){
  try{
    const targetId = e.target.id;
    await axios.delete(`/api/students/${targetId}`);
    store.dispatch(deleteStudent(targetId));
  }
  catch(e){
    console.log(e);
  }
}

function StudentCards ({students, schools}) {
  return(
    <div>
        {students.map((s)=> {
          return(
            <div key={s.id}>
              {s.firstName} {s.lastName}<br/>
              {s.GPA}<br/>
              <SchoolSelect schools={schools} defaultValue={s.schoolId} handleChange={updateStudent}/>
              <button id={s.id} onClick={destroyStudent}>Destroy Student</button>
            </div>
          );
        })
        }
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(StudentCards);
