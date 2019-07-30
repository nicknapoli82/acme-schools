import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {mostPopularSchool, calcHighestGPA} from './sharedFunctions/computation';
import LoginForm from './LoginForm';

function Header({schools, students, user}) {
  const userRole = user.role;
  const mostPopular = mostPopularSchool(schools, students);
  const highestGPA = calcHighestGPA(schools, students);
  return(
    <div className='header'>
      <h1><Link to='/'>Acme Schools</Link></h1>
      <Link to='/schools'>Schools {schools.length}</Link>
      {userRole !== 'guest' ? <Link to='/students'>Students {students.length}</Link> : null}
      <Link to={`/schools/${mostPopular.id}`}>Most Popular {mostPopular.name} ({mostPopular.size})</Link>
      <Link to={`/schools/${highestGPA.id}`}>Top School {highestGPA.name}</Link>
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students,
  user: state.user
});

export default connect(mapStateToProps)(Header);
