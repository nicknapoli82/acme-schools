import React from 'react';

export function SchoolSelect({schools, defaultValue, handleChange}) {
  return(
      <select  name='schoolId' onChange={handleChange} defaultValue={defaultValue}>
      <option key="0" value="Not Enrolled">--Not Enrolled--</option>
      {schools.map((s)=> <option key={s.id} value={s.id}>{s.name}</option>)}
    </select>
  );
}

export function StudentSelect({students, schoolId, defaultValue, handleChange}) {
  const enrollable = students.filter(s => s.schoolId !== schoolId);
  return(
    <select  name='studentId' onChange={(e)=> handleChange(e.target.value, schoolId)}>
      <option key="0" value={defaultValue}>{defaultValue}</option>
      {enrollable.map((s)=> <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
    </select>
  );
}
