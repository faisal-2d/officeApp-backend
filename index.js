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
      const studCollection = client.db("aqeedah").collection("aqeedah 16 list");     
  
  
  // ******************************
  //     stud list 
  // ******************************
  
      // get all sudents
      // http://localhost:5000/students
      app.get("/students", async (req, res) => {        
          const query = {};
          const result = await studCollection.find(query).toArray();
          res.send(result);
      });


    //   search by name 
    // http://localhost:5000/students/afrin
      app.get("/students/:name", async (req, res) => {
        const name = req.params.name;
        const query = {name : {$regex :name}};
        const result = await studCollection.find(query).toArray();
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
