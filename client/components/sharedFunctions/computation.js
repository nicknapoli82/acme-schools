// Returns a list of all schoolIds
export function schoolIdList(schools) {
  return schools.map((s)=> s.id);
}

// Returns a list of all Students based on schoolId
export function studentInSchoolList(students, schoolId){
  return students.filter((s)=> s.schoolId === schoolId);
}

// Determines the most popular school based on number of students enrolled
// in a single school. The flaw is we are looking for a single most popular
// school, but based on this only the first found will be the result if
// multiple schools have the same number of students.
// This could be expanded on by factoring in GPA of students should we want.
// Returns an object with School name(not ID) and number of students
export function mostPopularSchool(schools, students){
  // First get list of all schools
  const schoolList = schoolIdList(schools);
  // Next get a list of the number of students in each school
  // Each list index should be in order with eachother
  const studentBodyList = schoolList.map((sId)=> studentInSchoolList(students, sId).length);
  // Based on the fact that this is an O of n thing, this seems logical to me, though imperative
  let maxIndex = 0;
  for(let i in schoolList){
    if(studentBodyList[i] > maxIndex) maxIndex = i;
  }
  if (schools.length) {
    return {name: schools[maxIndex].name, size: studentBodyList[maxIndex]};
  }
  return 0;
}

// Calculates average GPA of all students sent to this function
// Optional filter for specific schoolId
export function calcAvgGPA(students, school = 'ALL') {
  // Get array of student GPAs based on schoolID or ALL
  const GPAs = students.filter((s)=> school === 'ALL' || s.schoolId === school)
        .map((s)=> s.GPA);

  // Calc and return average of all GPAs
  return GPAs.length === 0 ? 0 :
    GPAs.reduce((a, v)=> a += v) / GPAs.length;
}

// Calculate highest GPA of all schools
export function calcHighestGPA(schools, students) {
  // First get list of all schools by id
  const schoolList = schoolIdList(schools);

  // Once again, imperative but serves the purpose
  let highestGPA = 0;
  let schoolName = '';
  for (let i in schoolList){
    const check = calcAvgGPA(students, schools[i].id);
    if (check > highestGPA) {
      highestGPA = check;
      schoolName = schools[i].name;
    }
  }
  return {name: schoolName, GPA: highestGPA};
}

export default {mostPopularSchool, calcHighestGPA};
