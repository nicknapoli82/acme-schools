// Const Defines!!!
const INIT_SCHOOLS = 'INIT_SCHOOLS';

// action Methods
export const initSchools = (data)=> (
  {
    type: INIT_SCHOOLS,
    data: data
  }
);

const schoolReducer =  (schools = [], action)=> {
  // I will add stuff here soon!
  let newSchools = [...schools];
  switch(action.type) {
  case INIT_SCHOOLS:
    newSchools = [...schools, ...action.data];
  }
  return newSchools;
};

export default schoolReducer;
