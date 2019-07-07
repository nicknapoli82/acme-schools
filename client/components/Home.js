import React from 'react';

import Header from './Header';
import StudentForm from './StudentForm';

export default function Home({store}) {
  console.log(store);
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
