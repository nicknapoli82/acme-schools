import React from 'react';
import axios from 'axios';

import store from '../store';
import {createStudent} from '../storeReducers/studentReducer';

export default class StudentForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA: '',
      schoolID: ''
    };
  }

  handleChange(ev) {
    const {name, value} = ev.target;
    this.setState({ [name]: value});
  }

  handleSubmit(ev) {
    ev.preventDefault();
    axios.post('/api/students', this.state)
      .then((response)=>{
        store.dispatch(createStudent(response.config.data));
        console.log(response);
      })
      .catch((e)=>{
        console.log(e);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First Name
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
        </label>
        <label>Last Name
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
        </label>
        <label>Email
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>GPA
          <input type="text" name="GPA" value={this.state.GPA} onChange={this.handleChange} />
        </label>
        <select onChange={this.handleChange} >
          <option value="NULL">--Not Enrolled--</option>
        </select>Enroll At
        <button>Save</button>
      </form>
    );
  }
}
