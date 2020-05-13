const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/myproject';
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000 ;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res){
  
   // InsertDocument();

    
  res.send({data:"hello from server"});
  
});
app.post('/addorder',function(req,res){
  
  // InsertDocument();

  const data = req.body
//  console.log(data.data.table_id)
 const collection = "Orders"
 const collection1 = "Tables"
 InsertDocument(collection,data);
 updateDocument(collection1,data.data.table_id)
 //res.send({data:"hello from server"});
 
});
app.post('/getorders',function(req,res){
  
  // InsertDocument();

  const collection = "Orders"
 // console.log(req.body.data)
 getDocument(collection,req.body.data,res)
 //res.send({data:"hello from server"});
 
});
app.post('/archiveorder',function(req,res){
  
  // InsertDocument();

  const collection = "Orders"
  const collection1 = "ArchiveOrders"
  //console.log(req.body)
 // insertDocument(collection1,req.body)
 // DleteDocument(collection,req.body.id)
 //res.send({data:"hello from server"});
 
});
app.post('/gettables',function(req,res){
  
  // InsertDocument();

  const collection = "Tables"
 // console.log(req.body.id)
  getDocument(collection,req.body.id,res)
 //res.send({data:"hello from server"});
 
});
app.post('/newtable',function(req,res){
  const data = req.body
  const collection = "Tables"
  InsertDocument(collection,data);

   
 //res.send({data:"hello from server"});
 
});
app.post('/DeleteTable',function(req,res){
  const data = req.body
  const collection = "Tables"
  const collection1 = "Orders"
  const collection2 = "ArchivedOrders"
if(data.fromwhere==1){
updateDocument(collection,data)
InsertDocument(collection2,data.id);
DeleteDocument(collection1,data.id.table_id);
}else{
DeleteDocument(collection,parseInt(data.id.table_id));
}
//if(req.body.fromwhere==1){
// DeleteDocument(collection,data);
//}


   
 //res.send({data:"hello from server"});
 
});

app.post('/newbillcat',function(req,res){
    switch(req.body.fromwhere){
      case 0 :
        var  collection = "bills_type";
        break ; 
        case 1 :
          var collection = "menu_category";
          break ; 
        default :
        var collection = "ensa";
        break ;
    }
// var  collection = "bills_type";
 var data = req.body ;
//console.log(data);
 InsertDocument(collection,data);


});
app.post('/addnote',function(req,res){
  
 var  collection = "Notes";
var data = req.body ;
//console.log(data);
addnote(collection,data);


});
app.post('/getnotes',function(req,res){
  
  var  collection = "Notes";
 //var data = req.body ;
 //console.log(data);
 getnotes(res,collection);
 
 
 });
 app.post('/billdetails',function(req,res){
 
  //var bill_type = "ss";
  //console.log(req.body);
  switch(req.body.fromwhere){
    
    case 0 :
      var  collection = "bills_type";
      break ; 
      case 1 :
        var collection = "menu_category";
        break ; 
      default :
      var collection = "ensa";
      break ;
  }
var  x = getDocument(collection,req.body.name,res)
//console.log(JSON.stringify(x))
 //res.send({data: x})
 });

app.listen(port,function(){
console.log("SERVER");
});
const InsertDocument = function(collection, data, db, callback){
  // Get Collection
 //console.log("inserting into Tables collection")

    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
      //  data.id = db.collection(collection).countDocuments()
       // console.log("www",db.collection(collection).countDocuments())
        db.collection(collection).insert(data, function (findErr, result) {
          if (findErr) throw findErr;
         // console.log(result);
          client.close();
        });
      }); 
}
const getDocument = function(collection,bill_type,res, db, callback){
  // Get Collection
 // console.log(bill_type)
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
        var data
        if(bill_type=="" || bill_type===-1){
          var find = {}
        }else{
          var find = {name : bill_type}
        }
        db.collection(collection).find(find).toArray(function(err,result){
         if (err) throw err;
          console.log(result);
         res.send({data:result})
          client.close();
         
        });
      
        
      }); 
      
}
const DeleteDocument = function(collection, id, db, callback){
  // Get Collection
 //console.log("inserting into Tables collection")
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
        if(collection=="Orders"){
          var data = {"data.table_id":id}
        }else{
        var data = {id:id}
        }
        db.collection(collection).deleteOne(data, function (findErr, result) {
          if (findErr) throw findErr;
         // console.log(result);
          client.close();
        });
      }); 
}
const addnote = function(collection, data, db, callback){
  // Get Collection
 //console.log("inserting into Notes collection ")

    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
      //  data.id = db.collection(collection).countDocuments()
       // console.log("www",db.collection(collection).countDocuments())
        db.collection(collection).insert(data, function (findErr, result) {
          if (findErr) throw findErr;
         // console.log(result);
          client.close();
        });
      }); 
}
const getnotes = function(res,collection, db, callback){
  // Get Collection
 // console.log(bill_type)
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
      
        db.collection(collection).find({}).toArray(function(err,result){
         if (err) throw err;
          console.log(result);
         res.send({data:result})
          client.close();
         
        });
      
        
      }); 
      
}
const updateDocument = function(collection,id, db, callback){
  // Get Collection
 // console.log(bill_type)
// console.log("here",id)
 status = "busy"
 if(id.fromwhere==1){
   id  = id.id.table_id
   status = "empty"
 }
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err;
         
        var db = client.db('myproject');
        
        db.collection(collection).updateOne({"id":parseInt(id)}, {$set: {"Status": status}},function(err,result){
         if (err) throw err;
         
          client.close();
         
        });
    
     
    
        
      }); 
      
}

