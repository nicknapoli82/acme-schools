import React from 'react';

export default function SchoolSelect({schools, defaultValue, handleChange}) {
  return(
      <select  name='schoolId' onChange={handleChange} defaultValue={defaultValue}>
      <option key="0" value="Not Enrolled">--Not Enrolled--</option>
      {schools.map((s)=> <option key={s.id} value={s.id}>{s.name}</option>)}
    </select>
  );
}
