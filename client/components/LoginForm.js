import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from '../storeReducers/userReducer';

function userLogin(ev) {
    ev.preventDefault();
    const email = ev.target[0].value;
    const password = ev.target[1].value;
    axios.post('/api/session/login', {email: email, password: password})
	.then(response => {
	    if(response.status === 202)
		store.dispatch(loginUser(response.data));
	});
}

function userLogout(ev) {
    axios.get('/api/session/logout')
	.then(res => {
	    store.dispatch(logoutUser());
	})
	.catch(e => {
	    console.log('Something went horribly wrong\n', e);
	});
}

function LoginForm({user, students}) {
    let studentName = '';
    if(user.role === 'student') {
	const student = students.filter(s => s.id === user.studentId);
	studentName = `${student[0].firstName} ${student[0].lastName}`;
    }
    if(user.role !== 'guest')
	return (
	    <div>
	      <button onClick={userLogout}>Logout</button><br/>
	      <p>{user.role}{user.role === 'student' ? ` | ${studentName}` : ''}</p>
	    </div>);
    else
	return (
	    <div>
	      <form onSubmit={userLogin}>
		<label>Email
		  <input type='email' name='email' />
		</label>
		<label>Password
		  <input type='text' name='password' />
		</label>
		<button>Login</button>
	      </form>
	    </div>
	);
}

const mapStateToProps = state => ({
    user: state.user,
    students: state.students
});

export default connect(mapStateToProps)(LoginForm);
