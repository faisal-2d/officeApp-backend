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
      const aqeedah_17_list = client.db("aqeedah_16").collection("aqeedah_17_list");     
      const aqeedah_16_list = client.db("aqeedah_16").collection("aqeedah_16_list");     
      const aqeedah_15_list = client.db("aqeedah_16").collection("aqeedah_15_list");     
      const aqeedah_14_list = client.db("aqeedah_16").collection("aqeedah_14_list");     
      const allUsers = client.db("users").collection("all_users");     
  
  
  // ******************************
  //     Batch 17
  // ******************************  

  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
      app.get("/aqeedah/17/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_17_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/17/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_17_list.findOne(query);
        res.send(result);
      });
  
  // ******************************
  //     Batch 16
  // ******************************  

  //   searchbar by name 
    // http://localhost:5000/aqeedah_16/afrin
      app.get("/aqeedah/16/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_16_list.find(query, options).toArray();
        res.send(result);
      });
      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/16/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_16_list.findOne(query);
        res.send(result);
      });

   
  
  // ******************************
  //     Batch 15
  // ******************************  

  //   searchbar by name 
    // http://localhost:5000/aqeedah_16/afrin
      app.get("/aqeedah/15/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};        
        const result = await aqeedah_15_list.find(query).toArray();
        console.log('Im in 15')
        res.send(result);
      });
      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/15/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_15_list.findOne(query);
        res.send(result);
      });

  // ******************************
  //     Batch 14
  // ******************************

  //   searchbar by name 
    // http://localhost:5000/aqeedah_16/afrin
      app.get("/aqeedah/14/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();       
          const query = {name : {$regex :name}};       
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_14_list.find(query, options).toArray();
        res.send(result);
      });
      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/14/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_14_list.findOne(query);
        res.send(result);
      });

      // merit
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/meritlist/aqeedah/14", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_14_list.find(query, options).toArray();
        res.send(result);
      });

      // update aqeedah3Data
       http://localhost:5000/level3/13
       app.put("/level3/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn}; 
         const updateDocument = {
           $set : req.body,
          //  $set : {'aqeedah3data' : req.body } ,
         }    
         const result = await aqeedah_14_list.updateOne(filter, updateDocument);      
         res.send({ success: true, result});
       });

      //  total mark
      http://localhost:5000/level3/13
       app.put("/level3total/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn};
         const getStud = await aqeedah_14_list.findOne(filter);
         const updateDocument = await {
           $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                     getStud.aqeedah3data[1].Score + 
                                     getStud.aqeedah3data[2].Score + 
                                     getStud.aqeedah3data[3].Score } ,
         }    
         const result = await aqeedah_14_list.updateOne(filter, updateDocument);      
         res.send({ success: true, result});
       });

      
  // ******************************
  //     create user on log in
  // ******************************  

  //   searchbar by name 
    // http://localhost:5000/aqeedah_16/afrin
      app.get("/allUsers", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_14_list.find(query, options).toArray();
        res.send(result);
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
