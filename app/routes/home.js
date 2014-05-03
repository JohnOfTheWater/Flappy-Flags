'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  var countries = _.sample(global.flags, 7);
  var flags = _.shuffle(countries);
  res.render('home/index', {flags:flags, countries:countries, title: 'Flappy Flags'});
};

exports.match = function(req, res){
  var success = 'yes';
  var unsuccess = 'no';
  if(req.query.flag === req.query.country){
    res.send({answer:success});
  }else{
    res.send({answer:unsuccess});
  }
};
