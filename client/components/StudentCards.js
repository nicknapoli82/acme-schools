import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';
import SchoolSelect from './sharedComponents/SchoolSelect';

function updateStudent(e){
  console.log(e.target.value);
}

function StudentCards ({students, schools}) {
  return(
    <div>
        {students.map((s)=> {
          return(
            <div key={s.id}>
              {s.firstName} {s.lastName}<br/>
              {s.GPA}<br/>
              <SchoolSelect schools={schools} defaultValue={s.schoolId} handleChange={updateStudent}/>
              <button>Destroy Student</button>
            </div>
          );
        })
        }
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(StudentCards);
