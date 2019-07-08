import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import {initSchools} from '../storeReducers/schoolReducer';
import {initStudents} from '../storeReducers/studentReducer';
import {mostPopularSchool, calcHighestGPA} from './sharedFunctions/computation';

function Home({schools, students}) {
  const mostPopular = mostPopularSchool(schools, students);
  const highestGPA = calcHighestGPA(schools, students);
  return(
    <div>
      <Header />
      <StudentForm />
      <h2>Home</h2>
      <p>Our most popular school is (TODO: MAKE Link){mostPopular.name} with {mostPopular.size} students.</p>
      <p>Our top performing school is (TODO: MAKE Link){highestGPA.name} with an average GPA of {highestGPA.GPA}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(Home);
