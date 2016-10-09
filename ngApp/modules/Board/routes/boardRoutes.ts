'use strict';
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Board = mongoose.model('Board');
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//POST: /api/v1/boards
router.post('/', auth, (req, res, next) => {
  let newBoard = new Board(req.body);
  newBoard.createdBy = req['payload']._id;
  newBoard.save((err, board) => {
    if(err) return next(err);
    User.update({ _id: req['payload']._id }, { $push: {'boards': board._id }}, (err, results) => {
      if (err) next(err);
      res.send(board);
    });
  });
});

//GET: /api/v1/boards
router.get('/getAllBoards', auth, (req, res, next) => {
  Board.find({ createdBy: req['payload']._id })
  .exec((err, boards) =>{
    if (err) return next(err);
    res.json(boards)
  });
})

//GET individual board: /api/v1/boards/:username
router.get('/:id', (req, res, next) => {
  Board.findOne({ _id: req.params.id })
  .populate('createdBy', 'username')
  .exec((err, board) => {
    if(err) return next(err);
    if(!board) return next({ message: 'Could not find your board'});
    res.send(board);
  })
})

export = router;

