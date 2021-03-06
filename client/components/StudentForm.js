import React from 'react';
import axios from 'axios';

import store from '../store';
import {createStudent} from '../storeReducers/studentReducer';
import {SchoolSelect} from './sharedComponents';

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
      schoolId: '',
      requestValid: ''
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
        store.dispatch(createStudent(response.data));
        this.setState({ firstName: '',
                        lastName: '',
                        email: '',
                        GPA: '',
                        schoolId: '',
                        requestValid: 'Success'});
      })
      .catch((e)=>{
        const errorList = e.response.data.reduce((acc, er) => {
          let tempStr = '';
          switch(er.message) {
          case "notEmpty":
            tempStr = 'Can not be Empty';
            break;
          case "isEmail":
            tempStr = 'Is not a valid Email';
            break;
          case "isNumeric":
            tempStr = 'Must be a number';
            break;
          case "max":
            tempStr = "Must be lower than 4";
            break;
          case "min":
            tempStr = "Must be greater than 0";
            break;
          }
          switch(er.input) {
          case "firstName":
            tempStr = 'First Name: ' + tempStr;
            break;
          case "lastName":
            tempStr = 'Last Name: ' + tempStr;
            break;
          case "GPA":
            tempStr = "GPA: " + tempStr;
          default:
            tempStr = `${er.input}: ` + tempStr;
          }
          acc.push(tempStr);
          return acc;
        }, []);
        this.setState({ requestValid: errorList });
      });
  }

  render() {
    const { firstName, lastName, email, GPA, schoolId, requestValid } = this.state;
    const {schools} = store.getState();
    let saveEnable = false;
    const successClass = requestValid === 'Success' ? true : false;
    if(firstName, lastName, email, GPA) saveEnable = true;
    return (
      <div className='student-form'>
        <form onSubmit={this.handleSubmit}>
          <label>First Name
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          </label><br/>
          <label>Last Name
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </label><br/>
          <label>Email
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label><br/>
          <label>GPA
            <input type="text" name="GPA" value={this.state.GPA} onChange={this.handleChange} />
          </label><br/>
          Enroll At<SchoolSelect schools={schools} defaultValue = {'--Not Enrolled--'} handleChange={this.handleChange}/><br/>
          { saveEnable === false ? <button disabled>Save</button> : <button>Save</button>}

        </form>
        <div className={successClass ? 'submit-success' : 'submit-error-list'}>
          {this.state.requestValid
            ? Array.isArray(this.state.requestValid)
            ? this.state.requestValid.map((e, idx)=> <p key={idx}>{e}</p>)
           : <p>Success</p>
           : null}
        </div>
      </div>
    );
  }
}
