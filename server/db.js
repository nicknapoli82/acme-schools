const Sequelize = require('sequelize');
const fs = require('fs');
const faker = require('faker');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-school', { logging: false });

// Seriously thought about removing timestamps from these models, but for now I think it should be
// fine. Now worries here.
const Student = db.define('student', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  GPA: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      isNumeric: true
    }
  }
});

const School = db.define('school', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  imageLocation: {
    type: Sequelize.STRING
  }
});

Student.belongsTo(School);
School.hasMany(Student);

async function syncAndSeed() {
  try{
    await db.sync({force: true});
    await fs.readFile('./seedData/schools.json', async (err, result)=> {
      const data = JSON.parse(result);
      const schools = await Promise.all(
        data.map((school)=>
                 School.create({name: school.name, imageLocation: school.imageLocation})));
      // Lets generate some students Randomly just to get the Database going eh?
      const students = [];
      for (let i = 0; i < 100; i++){
        const tempS = {};
        tempS.firstName = faker.name.firstName();
        tempS.lastName = faker.name.lastName();
        tempS.email = faker.internet.email();
        tempS.GPA = Math.round(Math.random() * 40) / 10;
        // Maybe assign student to school
        let randomSchool = Math.floor(Math.random() * (schools.length + 1));
        if (randomSchool < schools.length) tempS.schoolId = schools[randomSchool].id;
        students.push(tempS);
      }
      await Promise.all(students.map( s=> Student.create(s)));
    });
  }
  catch(e){
    console.log(e);
  }
}

syncAndSeed();

module.exports = {Student, School, syncAndSeed, db};
