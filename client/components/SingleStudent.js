import React from 'react';
import axios from 'axios';
import {SchoolSelect} from './sharedComponents';
import {updateStudent, deleteStudent} from '../storeReducers/studentReducer';
import store from '../store';

async function changeStudent(e){
  const {name, value} = e.target;
  const id = e.target.parentNode.querySelector('button').id;
  try{
    const success = await axios.put(`/api/students/${id}`, `schoolId=${value}`);
    store.dispatch(updateStudent(id, value));
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

export default function SingleStudent ({student, schools, userRole}) {
  let imgLocation = schools.filter(school=> student.schoolId === school.id);
  imgLocation = imgLocation.length ? imgLocation[0].imageLocation : undefined;
  return(
      <div className='single-card'>
      <div>{`${student.firstName} ${student.lastName}`}</div>
      <div>{imgLocation ? <img src={imgLocation} /> : null}</div>
      {student.GPA}
    {userRole === 'admin' ? <SchoolSelect schools={schools} defaultValue={student.schoolId} handleChange={changeStudent}/> : null}
    {userRole === 'admin' ? <button id={student.id} onClick={destroyStudent}>Destroy Student</button> : null}
    </div>
  );
}
