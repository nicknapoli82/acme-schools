import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import {initSchools} from '../storeReducers/schoolReducer';
import {initStudents} from '../storeReducers/studentReducer';

function Home({schools, students}) {
  return(
    <div>
      <Header />
      <StudentForm />
      <h2>Home</h2>
      <p>Our most popular school is (placeholder mostPopular) with (placeHolder numStudents) students.</p>
      <p>Our top performing school is (placeholder topSchool) with an average GPA of (placeholder avgGPA)</p>
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(Home);
