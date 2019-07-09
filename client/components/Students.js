import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import StudentCards from './StudentCards';

export default function Students () {
  return (
    <div>
      <Header />
      <StudentForm />
      <StudentCards />
    </div>
  );
}
