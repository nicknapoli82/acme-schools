import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import SingleStudent from './SingleStudent';
import store from '../store';

function StudentCards ({students, schools}) {
  return(
    <div className='cards-list'>
      {
        students.map((s)=> <SingleStudent key={s.id} student={s} schools={schools} />)
      }
    </div>
  );
}

const mapStateToProps = state => ({
  schools: state.schools,
  students: state.students
});

export default connect(mapStateToProps)(StudentCards);
