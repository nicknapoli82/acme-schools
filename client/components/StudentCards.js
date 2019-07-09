import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import StudentForm from './StudentForm';

function StudentCards ({students, schools}) {
  return(
    <div>
        {students.map((s)=> {
          return(
            <div key={s.id}>
              {s.firstName} {s.lastName}<br/>
              {s.GPA}<br/>
              <select>
                <option>--Not Enrolled--</option>
              </select><br/>
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
