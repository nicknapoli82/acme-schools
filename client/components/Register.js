import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import store from '../store';

export default class Register extends React.Component {
    constructor() {
	super();
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.ValidLink = this.ValidLink.bind(this);
	this.state = {
	    email: '',
	    password: ''
	};
    }

    handleChange(ev) {
	const {name, value} = ev.target;
	this.setState({ [name]: value});
    }

    handleSubmit(ev) {
	ev.preventDefault();
	axios.post('/api/session/register', this.state)
	    .then(response => {
		this.setState({email: '', password: '', link: response.data.link});
	    })
	    .catch(e => {
		this.setState({error: true});
	    });
    }

    // A lame little function to make my hack work. Things should be different!!!
    ValidLink() {
	const {link} = this.state;
	console.log(`/api/session/register/${link}`);
	return (
	    <div>
	      <p>Simulating an email to confirm email address</p>
	      <a href={`/api/session/register/${link}`}>Click here to verify your email
	      </a>
	    </div>	    
	);
    }

    componentDidMount() {
	
    }

    render() {
	return (
	    <div>
	      <Header />
	      <h1>Welcome new student</h1>
	      <p>Just a quick setup and you will have access to your student account!</p>
	      <p>An administrator should have already setup your account, you just need to set up your password!</p>
	      <form onSubmit={this.handleSubmit}>
		<label>Your Email<input name='email' value={this.email} onChange={this.handleChange}/></label>
		<label>Your Password<input name='password' value={this.password} onChange={this.handleChange}/></label>
		<button>Submit!</button>
	      </form>
	      <br/>
	      { this.state.link ? <this.ValidLink /> : null }
	    </div>
	);
    }
}
