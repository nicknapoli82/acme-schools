import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import SchoolCards from './SchoolCards.js';

export default function Schools () {
  return (
      <div>
      <Header />
      <StudentForm />
      <SchoolCards />
      </div>
  );
}
