const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const {hashPassword} = require('../utils/generalUtil');

const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost/acme-school',
    { logging: false }
);

// Seriously thought about removing timestamps from these models, but for now I think it should be
// fine. Now worries here.
const Student = db.define('student', {
    id: {
	type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4,
	primaryKey: true,
    },
    firstName: {
	type: Sequelize.STRING,
	validate: {
	    notEmpty: true,
	},
    },
    lastName: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	    notEmpty: true,
	},
    },
    email: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	    isEmail: true,
	},
    },
    GPA: {
	type: Sequelize.FLOAT,
	allowNull: true,
	validate: {
	    isNumeric: true,
	    min: 0,
	    max: 4
	},
    },
});

const School = db.define('school', {
    id: {
	type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4,
	primaryKey: true,
    },
    name: {
	type: Sequelize.STRING,
	validate: {
	    notEmpty: true,
	},
    },
    imageLocation: {
	type: Sequelize.STRING,
    },
});

// Based on the fact that this information will always
// be local to the server, I think this should work fine
const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	    isEmail: true,
	},
    },
    password: {
	type: Sequelize.STRING,
	allowNull: false,
    },
    role: {
	type: Sequelize.ENUM('student', 'admin'),
    },
}, {timestamps: false});

User.beforeCreate((userInstance, optionsObject) => {
    userInstance.password = hashPassword(userInstance.password);
});

User.verifyPassword = function(user, verify) {
    return user.password === hashPassword(verify) ? true : false;
};

Student.belongsTo(School);
User.belongsTo(Student);
School.hasMany(Student);

async function syncAndSeed() {
    try {
	await db.sync({ force: true });

	const src = path.join(__dirname, 'seedData', 'schools.json');
	let data = fs.readFileSync(src, 'utf8');
	data = JSON.parse(data);

	const schools = await Promise.all(
	    data.map(school =>
		     School.create({
			 name: school.name,
			 imageLocation: school.imageLocation,
		     })
		    )
	);
	// Lets generate some students Randomly just to get the Database going eh?
	const students = [];
	for (let i = 0; i < 20; i++) {
	    const tempS = {};
	    tempS.firstName = faker.name.firstName();
	    tempS.lastName = faker.name.lastName();
	    tempS.email = faker.internet.email();
	    tempS.GPA = Math.round(Math.random() * 40) / 10;
	    // Maybe assign student to school
	    let randomSchool = Math.floor(Math.random() * (schools.length + 1));
	    if (randomSchool < schools.length)
		tempS.schoolId = schools[randomSchool].id;
	    students.push(tempS);
	}
	await Promise.all(students.map(s => Student.create(s)));

	// Finally lets generate an admin
	await User.create({email: 'test@this.admin', password: 'testing', role: 'admin'});
    } catch (e) {
	console.log(e);
    }
}

syncAndSeed();

module.exports = { Student, School, User, syncAndSeed, db };
