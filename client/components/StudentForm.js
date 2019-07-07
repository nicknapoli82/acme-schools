import React from 'react';

export default function StudentForm () {
  return (
    <form>
      <label>First Name
        <input type="text" name="firstName" />
      </label>
      <label>Last Name
        <input type="text" name="lastName" />
      </label>
      <label>Email
        <input type="text" name="email" />
      </label>
      <label>GPA
        <input type="text" name="GPA" />
      </label>
      <select>
        <option value="NULL">--Not Enrolled--</option>
      </select>Enroll At
      <button>Save</button>
    </form>
  );
}
