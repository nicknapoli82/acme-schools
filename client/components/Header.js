import React from 'react';
import {connect} from 'react-redux';

function Header({schools, students}) {
  return(
      <div>
        <h1>Acme Schools</h1>
        <div>
          <ul>
            <li>Schools {schools.length}</li>
            <li>Students {students.length}</li>
            <li>Most Popular (placeholder mostPopular)</li>
            <li>Top School (placeholder topSchool)</li>
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
