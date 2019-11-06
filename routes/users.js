var express = require('express');
var router = express.Router();
var mysql = require("mysql");
//Database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carby"
});
/* GET users listing. */
router.post('/checkid', function(req, res, next) {
  con.connect((err)=>{
    if (err) console.log(err);
    con.query(`SELECT * FROM login_user WHERE user_id='${req.body.username}'`, function (error, results, fields) {
      if (error) console.log(error);      
      res.send(JSON.stringify(results));
    });
  })
});
router.post('/regnew', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`INSERT INTO login_user VALUES('${req.body.username}','${req.body.password}')`, function (error, results, fields) {
      if (error) console.log(error);
    });
    con.query(`INSERT INTO user_info(user_id,age,sex,weight,height,pref_status) VALUES('${req.body.username}','${req.body.age}','${req.body.sex}',${req.body.weight},${req.body.height},'F')`, function (error, results, fields) {
      if (error) console.log(error);
      res.json('sucess');
    });
  })
});
router.post('/loginuser', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`SELECT * FROM login_user WHERE user_id='${req.body.username}' AND user_pass='${req.body.password}'`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(JSON.stringify(results));
    });
  })
});

router.post('/about_user', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`SELECT * FROM user_info WHERE user_id='${req.body.username}'`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(JSON.stringify(results));
    });
  })
});
router.post('/update_user', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`UPDATE user_info SET age='${req.body.age}',sex='${req.body.sex}',weight='${req.body.weight}',height='${req.body.height}',goal='${req.body.goal}',activeness='${req.body.activeness}',pref_status='A' WHERE user_id='${req.body.username}'`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(JSON.stringify(results));
    });
  })
});
router.post('/check_daily_new', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`SELECT * FROM food_info WHERE user_id='${req.body.username}' AND food_date='${req.body.date}'`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(JSON.stringify(results));
    });
  })
});
router.post('/addfood', function (req, res, next) {
  con.connect((err) => {
    if (err) console.log(err);
    con.query(`INSERT INTO food_info(food_id,label,quant,category,cals,carbs,fat,fiber,protein,user_id,food_date) VALUES('${req.body.food_id}','${req.body.label}','${req.body.quant}','${req.body.category}','${req.body.cals}','${req.body.carbs}','${req.body.fat}','${req.body.fiber}','${req.body.protein}','${req.body.user_id}','${req.body.date}')`, function (error, results, fields) {
      if (error) console.log(error);
    });
  })
});
module.exports = router;
