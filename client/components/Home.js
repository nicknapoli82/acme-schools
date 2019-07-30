import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import {mostPopularSchool, calcHighestGPA} from './sharedFunctions/computation';

function Home({schools, students, user}) {
  const userRole = user.role;
  const mostPopular = mostPopularSchool(schools, students);
  const highestGPA = calcHighestGPA(schools, students);
  return(
    <div>
      <Header />
      {userRole === 'admin' ? <StudentForm /> : null}
      <h2>Home</h2>
      <p>Are you a new student and need to register? Go here to register!</p>
      <Link to='/register'><button>Register!</button></Link>
      <p>Our most popular school is <Link to={`/schools/${mostPopular.id}`}>{mostPopular.name}</Link> with {mostPopular.size} students.</p>
      <p>Our top performing school is <Link to={`/schools/${highestGPA.id}`}>{highestGPA.name}</Link> with an average GPA of {highestGPA.GPA.toFixed(1)}</p>
      <br/><br/>
      <p>Notes: To those using this simple app.<br/>
	The notion of how things would work is as follows.<br/>
	An 'admin' would log in and create a new student.<br/>
	An 'admin' can make modifications to existing students.<br/>
	A student would then register with the app.<br/>
	A student can not make new students, only view all features.<br/>
	A guest can not view students, only available schools.<br/>
	<br/>
	Default 'admin' login credentials:<br/>
	Email = test@this.admin<br/>
	Password = testing<br/>
      </p>
      </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students,
  user: state.user
});

export default connect(mapStateToProps)(Home);
