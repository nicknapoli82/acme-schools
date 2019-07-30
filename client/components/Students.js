import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import StudentCards from './StudentCards';

function Students ({user}) {
  const userRole = user.role;
  return (
    <div>
      <Header />
      {userRole === 'admin' ? <StudentForm /> : null}
      <StudentCards />
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students,
  user: state.user
});

export default connect(mapStateToProps)(Students);
