import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {mostPopularSchool, calcHighestGPA} from './sharedFunctions/computation';

function Header({schools, students}) {
  const mostPopular = mostPopularSchool(schools, students);
  const highestGPA = calcHighestGPA(schools, students);
  return(
    <div>
      <h1><Link to='/'>Acme Schools</Link></h1>
      <div>
        <ul>
          <li><Link to='/schools'>Schools {schools.length}</Link></li>
          <li><Link to='/students'>Students {students.length}</Link></li>
          <li><Link to={`/schools/${mostPopular.id}`}>Most Popular {mostPopular.name} ({mostPopular.size})</Link></li>
          <li><Link to={`/schools/${highestGPA.id}`}>Top School {highestGPA.name}</Link></li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(Header);
