// Const Defines!!!
const GET_SCHOOLS = 'GET_SCHOOLS';

// action Methods
export const getSchools = ()=> (
  {
    type: GET_SCHOOLS,
  }
);

export default function schoolReducer (schools = [], action) {
  // I will add stuff here soon!
  switch(action.type) {
  case GET_SCHOOLS:
  }
  return schools;
}
