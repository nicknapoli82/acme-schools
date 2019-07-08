import React from 'react';
import {connect} from 'react-redux';
import {mostPopularSchool, calcHighestGPA} from './sharedFunctions/computation';

function Header({schools, students}) {
  const mostPopular = mostPopularSchool(schools, students);
  const highestGPA = calcHighestGPA(schools, students);
  return(
      <div>
        <h1>Acme Schools</h1>
        <div>
          <ul>
            <li>Schools {schools.length}</li>
            <li>Students {students.length}</li>
            <li>Most Popular {mostPopular.name} ({mostPopular.size})</li>
            <li>Top School {highestGPA.name}</li>
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
