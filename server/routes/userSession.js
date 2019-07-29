const router = require('express').Router();
const db = require('../db');
const {User, Student} = db;

module.exports = router;

router.post('/login', async (req, res, next) => {
    try {
	const user = await User.findOne({where: {email: req.body.email}});
	if(user && User.verifyPassword(user, req.body.password)) {
	    req.session.loggedIn = user.id;
	    if(user.role === 'admin') {
		res.status(202).send({role: user.role});
	    }
	    else {
		res.status(202).send({role: 'student', studentId: user.studentId});
	    }
	}
	else {
	    // User password bad
	    res.status(404).send();
	}
    }
    catch(e) {
	// User not found by email
	console.log(e);
	res.status(404).send();
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.status(202).send();
});

router.get('/checkLoggedIn', async (req, res, next) => {
    if(req.session.loggedIn) {
	try {
	    const user = await User.findByPk(req.session.loggedIn);
	    res.status(202).send({role: user.role, studentId: user.studentId});
	}
	catch(e) {
	    res.status(404).send();
	}
    }
    else res.send();
});

// Note: I would probably use something different than just the student
// table id for this, but for the sake of just making something. I think this
// suffices for now.
router.get('/register/:id', async (req, res, next) => {
    console.log('This happened');
    try{
	console.log(req.params.id);
	const user = await User.create({...req.session.user, studentId: req.params.id});
	req.session.destroy();
	res.redirect('/');
    }
    catch(e){
	next(e);
    }
});

router.post('/register', async (req, res, next) => {
    try{
	const student = await Student.findOne({where: {email: req.body.email}});
	if(student) {
	    req.session.user = {email: student.email,
				password: req.body.password,
				role: 'student'};
	    res.status(202).send({link: student.id});
	}
	else{
	    res.status(404).send();
	}
    }
    catch(e){
    }
});
