const router = require('express').Router();
const db = require('../db');
const {Student} = db;

module.exports = router;

router.get('/', async (req, res, next)=> {
  try{
    res.send(await Student.findAll());
  }
  catch(e){
    console.log(e);
    next(e);
  }
});

router.post('/', async (req, res, next)=> {
  try{
    const result = await Student.create(req.body);
    res.status(201).send(result);
  }
  catch(e){
    next(e);
  }
});

router.put('/:id', async (req, res, next)=> {
  try{
    const schoolId = req.body.schoolId === 'Not Enrolled' ? null : req.body.schoolId;
    const test = await Student.update({schoolId: schoolId}, {where: {id: req.params.id}});
    res.status(202).send();
  }
  catch(e){
    next(e);
  }
});

router.delete('/:id', async (req, res, next)=> {
  try{
    await Student.destroy({where: {id: req.params.id}});
    res.status(202).send();
  }
  catch(e){
    next(e);
  }
});

/* TODO: Nick make the rest of the routes for the school api
   Right now it only needs get. Should make complete*/
