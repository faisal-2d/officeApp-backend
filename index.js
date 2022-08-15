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



function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized'});
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, decoded) {
    if (error) {
      return res.status(403).send({ message: 'Forbidden access' })
    }
    req.decoded = decoded;
    next();
  });
}



async function run() {
    try {
      await client.connect();
      const aqeedah_17_list = client.db("aqeedah_16").collection("aqeedah_17_list");     
      const aqeedah_16_list = client.db("aqeedah_16").collection("aqeedah_16_list");     
      const aqeedah_15_list = client.db("aqeedah_16").collection("aqeedah_15_list");     
      const aqeedah_14_list = client.db("aqeedah_16").collection("aqeedah_14_list");     
      const userCollection = client.db("users").collection("all_users"); 


      
      
      // *********************
      // All Users 
      // *********************


      // get all users
    // http://localhost:5000/users
    app.get("/users", async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
  });

  // create one user
  // http://localhost:5000/user/email
  app.put("/user/:email", async (req, res) => {
    const email = req.params.email;
    const filter = {email : email};
    const options = { upsert : true };
    const updateUser = {
      $set : {email : email},
    }      
    const result = await userCollection.updateOne(filter, updateUser, options);
    const token = jwt.sign({email : email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ success: true, result, token});
  });


  // make an user Admin
  // http://localhost:5000/admin/email
  app.put("/makeadmin/:email", async (req, res) => {      
    const email = req.params.email;
    const filter = {email : email};
    const options = { upsert : true };
    const updateUser = {
      $set : {role : 'admin'},
    }      
    const result = await userCollection.updateOne(filter, updateUser, options);      
    res.send({ success: true, result});
  });


  // check Admin
  // http://localhost:5000/admin/email
  app.get("/isadmin/:email", async (req, res) => {      
    const email = req.params.email;      
    const user = await userCollection.findOne({email : email}); 
    const isAdmin = user.role === 'admin';  
    res.send({ isAdmin: isAdmin});
  });
  
  
  // ******************************
  //     Batch 17
  // ******************************  

  //get count
      http://localhost:5000/count/aqeedah/17
      app.get("/count/aqeedah/17", async (req, res) => {
        const result = await aqeedah_17_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

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

      //create a new stud
    // http://localhost:5000/product
    app.post("/newregister", async (req, res) => {
      // const sn = parseInt(req.body.sn);
      // const otherInfo = req.body.info;
      // const data = {
      //   sn : sn,
      //   name : otherInfo.name,
      //   fatherName : otherInfo.fatherName,
      //   phone : otherInfo.phone,
      //   gender : otherInfo.gender,
      //   aqeedah1payment : otherInfo.aqeedah1payment,
         
      // }
      const stud = req.body;
      const result = await aqeedah_17_list.insertOne(stud);
      res.send({ success: true, result});
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

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/exm2/aqeedah/16/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_16_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
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
      // http://localhost:5000/level3/13
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


      // update aqeedah3Data
      //http://localhost:5000/level3/13
       app.put("/certificate/aqeedah14/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn}; 
         const updateDocument = {
           $set : req.body,
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
