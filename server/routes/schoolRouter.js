const router = require('express').Router();
const db = require('../db');
const {School} = db;

module.exports = router;

router.get('/', async (req, res, next)=> {
  try{
    res.send(await School.findAll());
  }
  catch(e){
    console.log(e);
    next(e);
  }
});

/* TODO: Nick make the rest of the routes for the school api
   Right now it only needs get. Should make complete*/
