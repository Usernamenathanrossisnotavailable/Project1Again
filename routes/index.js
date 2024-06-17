var express = require('express');
var router = express.Router();

let serverBugArray = [];

var fs = require("fs");
let fileManager = {
  read: function() {
  var rawdata = fs.readFileSync('objectdata.json');
  let goodData = JSON.parse(rawdata);
  serverBugArray = goodData;
  },
  write: function() {
  let data = JSON.stringify(serverBugArray);
  fs.writeFileSync('objectdata.json', data);
  },
  validData: function() {
  var rawdata = fs.readFileSync('objectdata.json');
  console.log(rawdata.length);
  if(rawdata.length < 1) {
  return false;
  }
  else {
  return true;
  }
  }
};

let bugObject = function(enterName,enterImage,enterWeight,enterSize) {
    this.ID = Math.random().toString(16).slice(5);
    this.bName = enterName;
    this.bImage = enterImage;
    this.bWeight = enterWeight;
    this.bSize = enterSize;
}

 if(!fileManager.validData()) {
  serverBugArray[0] = new bugObject("bug","https://i0.wp.com/birdwatchinghq.com/wp-content/uploads/2021/11/ladybug-featured-image-scaled.jpg","12 grams","44 inches");
  serverBugArray[1] = new bugObject("bug2","https://www.thoughtco.com/thmb/qqOhIPG9D39-ZDvAO6uj3pr6g9w=/2400x1597/filters:no_upscale():max_bytes(150000):strip_icc()/1223096-LGPT-5911ff3c5f9b586470c15e79.jpg","1231 grams","99999 inches");
  fileManager.write();
 } else {
   fileManager.read();
 }



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index');
});

router.post('/AddBug', function(req, res) {
  const newBug = req.body;
  console.log(newBug);
  serverBugArray.push(newBug);
  fileManager.write();
  res.status(200).json(newBug);
});

router.get('/getAllBugs', function(req, res) {
  fileManager.read();
  res.status(200).json(serverBugArray);
});

module.exports = router;