const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")('sk_test_51L2IafEwxTNKPPwRmynUXRjPJCDUP4fUluUqwjuIHemwhjO4jrir2ZGU7nDrtd7CItZ6qnEHIE9eH7n3a8QqLqvK00QCUgsluA');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


var uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PASS}@ac-axtjn2w-shard-00-00.pk2vtjr.mongodb.net:27017,ac-axtjn2w-shard-00-01.pk2vtjr.mongodb.net:27017,ac-axtjn2w-shard-00-02.pk2vtjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-1goeck-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {  useNewUrlParser: true,  useUnifiedTopology: true,  serverApi: ServerApiVersion.v1});

async function run() {
    try {
      await client.connect();
      const studCollection = client.db("aqeedah_16").collection("aqeedah_16_list");     
  
  
  // ******************************
  //     Batch 16
  // ******************************
  
      // get all sudents
      // http://localhost:5000/students_16
      app.get("/students_16", async (req, res) => {        
          const query = {};
          const options = {
            sort: { "sn": 1 }
          };
          const result = await studCollection.find(query, options).toArray();
          res.send(result);
      });


    //   searchbar by name 
    // http://localhost:5000/students_16/afrin
      app.get("/students_16/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await studCollection.find(query, options).toArray();
        res.send(result);
      });

      //get an id
      http://localhost:5000/student/13
      app.get("/student/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await studCollection.findOne(query);
        console.log(result)
        res.send(result);
      });

      // insert a field 
      http://localhost:5000/student/13
      app.put("/student/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const options = { upsert : true };
        const updateUser = {
          $set : req.body,
        }    
        const result = await studCollection.updateOne(filter, updateUser, options);      
        res.send({ success: true, result});
      });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/levelOne/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[0]}`] : req.body } ,
        }    
        const result = await studCollection.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      
  } finally {
}
}
run().catch(console.dir);

// backend initialize
app.get("/", (req, res) => {
res.send("welcome to Al Haramain Islamic Academy");
});


app.listen(port, () => {
console.log("Al Haramain Islamic Academy is running on Port", port);
});
