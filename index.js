var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://marco:Marcopupu2014@ds021663.mlab.com:21663/supernotes');

var Templates = mongoose.model('Templates', {
  folderName: String,
  templates: [String]
});

app.get('/', function(req, res) {
  res.sendFile('angular.html');
});

// get all template folders
app.get('/api/folders', function(req, res) {
  Templates.find(function(err, folders) {
    if (err) res.status(400).send('error');
    res.json(folders);
  });
});

// create a new template folder
app.post('/api/folders/new', function(req, res) {
  Templates.create({
    folderName: req.body.foldername,
    templates: req.body.templates || []
  }, function(err, template) {
    if (err) res.status(400).send(err);
    res.json({ message: 'created new template',
    template: template});
  });
});

// get the folder by i.d.
app.get('/api/folders/get/:id', function(req, res) {
  Templates.findById(req.params.id, function(err, folder) {
    if (err) res.status(400).send(err);
    res.json(folder);
  });
});

// update folder with i.d.
app.post('/api/folders/edit', function(req, res) {
  Templates.findById(req.body.id, function(err, folder) {
      if (err) res.status(400).send(err);
      folder.folderName = req.body.foldername;

      // save
      folder.save(function(err) {
        if (err) res.status(400).send(err);
        res.json({ message: 'saved careplan'});
      });
  });
});

// delete folder by i.d.
app.post('/api/folders/delete/:id', function(req, res) {
  Templates.remove({ _id: req.params.id }, function(err, template) {
    if (err) res.status(400).send(err);
    res.json({ message: 'deleted careplan' });
  });
});

// add a new template by folder i.d.
app.post('/api/template/add', function(req, res) {
  Templates.findById(req.body.id, function(err, folder) {
    if (err) res.status(400).send(err);
    folder.templates.push(req.body.name);
  });
});

// update a template
app.post('/api/template/update', function(req, res) {
  Templates.update(
    { '_id': req.body.id, templates: req.body.oldtemplate },
    { '$set' : { 'templates.$' : req.body.newtemplate }},
    { multi: false },
    function(err, num) {
      if (err) res.status(400).send(err);
      res.json('updated ' + num);
  });
});

// delete a template by folder i.d.
app.post('/api/template/delete', function(req, res) {
  Templates.update({ _id: req.body.id },
    { $pull: { templates: [ req.body.template ]}});
  });
});
//

app.listen(process.env.PORT || 8000, function() {
  console.log('Server started...');
});
