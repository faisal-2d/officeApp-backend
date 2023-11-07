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
      const aqeedah_21_list = client.db("aqeedah_16").collection("aqeedah_21_list");     
      const aqeedah_20_list = client.db("aqeedah_16").collection("aqeedah_20_list");     
      const aqeedah_19_list = client.db("aqeedah_16").collection("aqeedah_19_list");     
      const aqeedah_18_list = client.db("aqeedah_16").collection("aqeedah_18_list");     
      const aqeedah_17_list = client.db("aqeedah_16").collection("aqeedah_17_list");     
      const aqeedah_16_list = client.db("aqeedah_16").collection("aqeedah_16_list");     
      const aqeedah_15_list = client.db("aqeedah_16").collection("aqeedah_15_list");  
      const aqeedah_14_list = client.db("aqeedah_16").collection("aqeedah_14_list");     

      const fiqh_1_list = client.db("fiqh").collection("fiqh_1_list");     
      const seerat_1_list = client.db("seerat").collection("seerat_1_list");     
      const tafseer_1_list = client.db("tafseer").collection("tafseer_1_list");     
      
      
      const arabic_1_list = client.db("arabic").collection("arabic_1_list");     
      const arabic_2_list = client.db("arabic").collection("arabic_2_list");     
      const arabic_3_list = client.db("arabic").collection("arabic_3_list");     
      const arabic_4_list = client.db("arabic").collection("arabic_4_list");     
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
    const checkEmail = req.params.email;      
    const user = await userCollection.findOne({email : checkEmail}); 
    if (user?.role === 'admin') {
      res.send({ isAdmin: true});    }
    else {
      res.status(403).send({ message: 'forbidden' });
    }   
  });

  // check Admin
  // http://localhost:5000/admin/email
  app.get("/ismodrator/:email", async (req, res) => {      
    const checkEmail = req.params.email;      
    const user = await userCollection.findOne({email : checkEmail}); 
    if (user?.role === 'moderator') {
      res.send({ isModerator: true});    }
    else {
      res.status(403).send({ message: 'forbidden' });
    }   
  });

    
  // ******************************
  //     Arabic Batch 4
  // ****************************** 

  //get count
  http://localhost:5000/
  app.get("/count/arabic/4", async (req, res) => {
    const result = await arabic_4_list.countDocuments();
    res.status(200).json({'success' : true, 'result': result})
  });


  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
    app.get("/arabic/4/:name", async (req, res) => {
      const name = req.params.name.toLowerCase();
      const query = {name : {$regex :name}};
      const options = {
          sort: { "sn": 1 }
        };
      const result = await arabic_4_list.find(query, options).toArray();
      res.send(result);
    });

    //get by sn
    http://localhost:5000/student/13
    app.get("/arabic/4/sn/:sn", async (req, res) => {
      const sn = parseInt(req.params.sn);
      const query = {sn : sn};
      const result = await arabic_4_list.findOne(query);
      res.send(result);
    });

    //create a new stud
  // http://localhost:5000/product
  app.post("/arabic/newregister4", async (req, res) => {
    const stud = req.body;
    const result = await arabic_4_list.insertOne(stud);
    res.send({ success: true, result});
  });

  
    // update filed 
    http://localhost:5000/
    app.put("/update/arabic/4/:sn", async (req, res) => {      
      const sn = parseInt(req.params.sn);
      const filter = {sn : sn}; 
      const updateDocument = {
        $set :  req.body 
      }    
      const result = await arabic_4_list.updateOne(filter, updateDocument);      
      res.send({ success: true, result});
    });
    
  // ******************************
  //     Arabic Batch 3
  // ****************************** 

  //get count
  http://localhost:5000/count/aqeedah/17
  app.get("/count/arabic/3", async (req, res) => {
    const result = await arabic_3_list.countDocuments();
    res.status(200).json({'success' : true, 'result': result})
  });


  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
    app.get("/arabic/3/:name", async (req, res) => {
      const name = req.params.name.toLowerCase();
      const query = {name : {$regex :name}};
      const options = {
          sort: { "sn": 1 }
        };
      const result = await arabic_3_list.find(query, options).toArray();
      res.send(result);
    });

    //get by sn
    http://localhost:5000/student/13
    app.get("/arabic/3/sn/:sn", async (req, res) => {
      const sn = parseInt(req.params.sn);
      const query = {sn : sn};
      const result = await arabic_3_list.findOne(query);
      res.send(result);
    });

    //create a new stud
  // http://localhost:5000/product
  app.post("/arabic/newregister3", async (req, res) => {
    const stud = req.body;
    const result = await arabic_3_list.insertOne(stud);
    res.send({ success: true, result});
  });

  
    // update filed 
    http://localhost:5000/levelOne/13
    app.put("/update/arabic/3/:sn", async (req, res) => {      
      const sn = parseInt(req.params.sn);
      const filter = {sn : sn}; 
      const updateDocument = {
        $set :  req.body 
      }    
      const result = await arabic_3_list.updateOne(filter, updateDocument);      
      res.send({ success: true, result});
    });

  // ******************************
  //     Arabic Batch 2
  // ****************************** 

  //get count
  http://localhost:5000/count/aqeedah/17
  app.get("/count/arabic/2", async (req, res) => {
    const result = await arabic_2_list.countDocuments();
    res.status(200).json({'success' : true, 'result': result})
  });


  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
    app.get("/arabic/2/:name", async (req, res) => {
      const name = req.params.name.toLowerCase();
      const query = {name : {$regex :name}};
      const options = {
          sort: { "sn": 1 }
        };
      const result = await arabic_2_list.find(query, options).toArray();
      res.send(result);
    });

    //get by sn
    http://localhost:5000/student/13
    app.get("/arabic/2/sn/:sn", async (req, res) => {
      const sn = parseInt(req.params.sn);
      const query = {sn : sn};
      const result = await arabic_2_list.findOne(query);
      res.send(result);
    });

    //create a new stud
  // http://localhost:5000/product
  app.post("/arabic/newregister2", async (req, res) => {
    const stud = req.body;
    const result = await arabic_2_list.insertOne(stud);
    res.send({ success: true, result});
  });

  
    // update filed 
    http://localhost:5000/levelOne/13
    app.put("/update/arabic/2/:sn", async (req, res) => {      
      const sn = parseInt(req.params.sn);
      const filter = {sn : sn}; 
      const updateDocument = {
        $set : {"arabic2payment" : req.body} 
      }    
      const result = await arabic_2_list.updateOne(filter, updateDocument);      
      res.send({ success: true, result});
    });

  // ******************************
  //     Arabic Batch 1
  // ****************************** 

  //get count
  http://localhost:5000/count/aqeedah/17
  app.get("/count/arabic/1", async (req, res) => {
    const result = await arabic_1_list.countDocuments();
    res.status(200).json({'success' : true, 'result': result})
  });


  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
    app.get("/arabic/1/:name", async (req, res) => {
      const name = req.params.name.toLowerCase();
      const query = {name : {$regex :name}};
      const options = {
          sort: { "sn": 1 }
        };
      const result = await arabic_1_list.find(query, options).toArray();
      res.send(result);
    });

    //get by sn
    http://localhost:5000/student/13
    app.get("/arabic/1/sn/:sn", async (req, res) => {
      const sn = parseInt(req.params.sn);
      const query = {sn : sn};
      const result = await arabic_1_list.findOne(query);
      res.send(result);
    });

    //create a new stud
  // http://localhost:5000/product
  app.post("/arabic/newregister1", async (req, res) => {
    const stud = req.body;
    const result = await arabic_1_list.insertOne(stud);
    res.send({ success: true, result});
  });

  
    // update filed 
    http://localhost:5000/levelOne/13
    app.put("/update/arabic/1/:sn", async (req, res) => {      
      const sn = parseInt(req.params.sn);
      const filter = {sn : sn}; 
      const updateDocument = {
        $set : {"arabic3payment" : req.body} 
      }    
      const result = await arabic_1_list.updateOne(filter, updateDocument);      
      res.send({ success: true, result});
    });




  
  // ******************************
  //     Batch 21
  // ******************************  

  //get count
      http://localhost:5000/count/aqeedah/17
      app.get("/count/aqeedah/21", async (req, res) => {
        const result = await aqeedah_21_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
      app.get("/aqeedah/21/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_21_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/21/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_21_list.findOne(query);
        res.send(result);
      });

      //create a new stud
    // http://localhost:5000/product
    app.post("/register/aqeedah/21", async (req, res) => {
      const stud = req.body;
      const result = await aqeedah_21_list.insertOne(stud);
      res.send({ success: true, result});
    });

    
      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/aqeedah21/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah21/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah21/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah21/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah21/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah21/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah21/level2/exm4/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/21/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/aqeedah21/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_21_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah1Total' : getStud.aqeedah1data[0].Score +
                                    getStud.aqeedah1data[1].Score + 
                                    getStud.aqeedah1data[2].Score} ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/aqeedah21/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_21_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score +
                                    getStud.aqeedah3data[3].Score} ,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

       // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/aqeedah21/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard fetch
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/21", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_21_list.find(query, options).toArray();
        res.send(result);
      });

      app.get("/leaderboard/aqeedah3/21", async (req, res) => {       
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_21_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });

       //http://localhost:5000/level3/13
      app.put("/aqeedah21/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah21/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah21/level3/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level3' : req.body.certificate},
        }    
        const result = await aqeedah_21_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

  // ******************************
  //     Batch 20
  // ******************************  

  //get count
      http://localhost:5000/count/aqeedah/17
      app.get("/count/aqeedah/20", async (req, res) => {
        const result = await aqeedah_20_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
      app.get("/aqeedah/20/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_20_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/20/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_20_list.findOne(query);
        res.send(result);
      });

      //create a new stud
    // http://localhost:5000/product
    app.post("/register/aqeedah/20", async (req, res) => {
      const stud = req.body;
      const result = await aqeedah_20_list.insertOne(stud);
      res.send({ success: true, result});
    });

    
      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/aqeedah20/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah20/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah20/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah20/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah20/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah20/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah20/level2/exm4/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/20/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/aqeedah20/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_20_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah1Total' : getStud.aqeedah1data[0].Score +
                                    getStud.aqeedah1data[1].Score + 
                                    getStud.aqeedah1data[2].Score} ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/aqeedah20/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_20_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score +
                                    getStud.aqeedah3data[3].Score} ,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

       // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/aqeedah20/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard fetch
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/20", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_20_list.find(query, options).toArray();
        res.send(result);
      });

      app.get("/leaderboard/aqeedah3/20", async (req, res) => {       
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_20_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });

       //http://localhost:5000/level3/13
      app.put("/aqeedah20/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah20/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah20/level3/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level3' : req.body.certificate},
        }    
        const result = await aqeedah_20_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
  
  // ******************************
  //     Batch 19
  // ******************************  

  //get count
      http://localhost:5000/count/aqeedah/17
      app.get("/count/aqeedah/19", async (req, res) => {
        const result = await aqeedah_19_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
      app.get("/aqeedah/19/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_19_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/19/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_19_list.findOne(query);
        res.send(result);
      });  

  

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/19/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

  
       // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/aqeedah19/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/19", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_19_list.find(query, options).toArray();
        res.send(result);
      });

       // http://localhost:5000/aqeedah_16/afrin
       app.get("/leaderboard/aqeedah3/19", async (req, res) => {       
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_19_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });

       // update filed 
      http://localhost:5000/levelOne/13
      app.put("/aqeedah19/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah19/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah19/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah19/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah19/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah19/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah19/level2/exm4/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      
       //http://localhost:5000/level3/13
      app.put("/aqeedah19/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah19/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah19/level3/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level3' : req.body.certificate},
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
  http://localhost:5000/level3/13
      app.put("/aqeedah19/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_19_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah1Total' : getStud.aqeedah1data[0].Score +
                                    getStud.aqeedah1data[1].Score + 
                                    getStud.aqeedah1data[2].Score} ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/aqeedah19/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_19_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score +
                                    getStud.aqeedah3data[3].Score} ,
        }    
        const result = await aqeedah_19_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });


  // ******************************
  //     Batch 18
  // ******************************  

  //get count
      http://localhost:5000/count/aqeedah/17
      app.get("/count/aqeedah/18", async (req, res) => {
        const result = await aqeedah_18_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

  //   searchbar by name 
    // http://localhost:5000/aqeedah_17/afrin
      app.get("/aqeedah/18/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await aqeedah_18_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/aqeedah/18/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await aqeedah_18_list.findOne(query);
        res.send(result);
      });
    
   

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/18/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });


       // promote to level2+3 
       http://localhost:5000/levelOne/13
       app.put("/accessLevelTwo/aqeedah18/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn}; 
         const updateDocument = {
           $set :  req.body,
         }    
         const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
         res.send({ success: true, result});
       });

      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/18", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_18_list.find(query, options).toArray();
        res.send(result);
      });

      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah3/18", async (req, res) => {       
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_18_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });

   // update filed 
      http://localhost:5000/levelOne/13
      app.put("/aqeedah18/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah18/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah18/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah1data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah18/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[0]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah18/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[1]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah18/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[2]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/aqeedah18/level2/exm4/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

  
       //http://localhost:5000/level3/13
      app.put("/aqeedah18/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah18/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/aqeedah18/level3/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'aqeedahCourseCertificates.level3' : req.body.certificate},
        }    
        // console.log(req.body.certificate);
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
  
  http://localhost:5000/level3/13
      app.put("/aqeedah18/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_18_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah1Total' : getStud.aqeedah1data[0].Score +
                                    getStud.aqeedah1data[1].Score + 
                                    getStud.aqeedah1data[2].Score} ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/aqeedah18/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_18_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score +
                                    getStud.aqeedah3data[3].Score} ,
        }    
        const result = await aqeedah_18_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
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

      // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/aqeedah17/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_17_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
        
      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/exm3/aqeedah/17/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_17_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/17aqeedah3total/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_17_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score + 
                                    getStud.aqeedah3data[3].Score} ,
        }    
        const result = await aqeedah_17_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/17/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_17_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  payment update
      http://localhost:5000/level3/13
      // app.put("/paymentupdate17batch/:sn", async (req, res) => {      
      //   const sn = parseInt(req.params.sn);
      //   const filter = {sn : sn};
      //   const getStud = await aqeedah_17_list.findOne(filter);
      //   const updateDocument = await {  
      //     $set : {'aqeedah2payment' : getStud.aqeedah3payment} ,
      //   }    
      //   const result = await aqeedah_17_list.updateOne(filter, updateDocument);      
      //   res.send({ success: true, result});        
      // });

      
      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/17", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_17_list.find(query, options).toArray();
        res.send(result);
      });

      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah3/17", async (req, res) => {       
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_17_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
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

      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/aqeedah/16/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await aqeedah_16_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/exm4/aqeedah2/16/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`aqeedah3data.${[3]}`] : req.body } ,
        }    
        const result = await aqeedah_16_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

       //  total mark
       http://localhost:5000/level3/13
       app.put("/16aqeedah3total/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn};
         const getStud = await aqeedah_16_list.findOne(filter);
         const updateDocument = await {  
           $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                     getStud.aqeedah3data[1].Score + 
                                     getStud.aqeedah3data[2].Score +
                                     getStud.aqeedah3data[3].Score } ,
         }    
         const result = await aqeedah_16_list.updateOne(filter, updateDocument);      
         res.send({ success: true, result});
       });

      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah1/16", async (req, res) => {
        const query = {};
        const options = {
            sort: { "aqeedah1Total": -1 }
          };
        const result = await aqeedah_16_list.find(query, options).toArray();
        res.send(result);
      });

       // leaderboard level 2
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah3/16", async (req, res) => {        
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_16_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });

       // update aqeedah3Data
      //http://localhost:5000/level3/13
      app.put("/certificate/aqeedah16/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : req.body,
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
        const options = {
          sort: { "sn": 1 }
        };       
        const result = await aqeedah_15_list.find(query, options).toArray();
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

      // update aqeedah3Data link
      // http://localhost:5000/level3/13
      app.put("/exm2level2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : req.body,
        }    
        const result = await aqeedah_15_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

       // update filed 
       http://localhost:5000/levelOne/13
       app.put("/exm4/aqeedah/15/:sn", async (req, res) => {      
         const sn = parseInt(req.params.sn);
         const filter = {sn : sn}; 
         const updateDocument = {
           $set : { [`aqeedah3data.${[3]}`] : req.body } ,
         }    
         const result = await aqeedah_15_list.updateOne(filter, updateDocument);      
         res.send({ success: true, result});
       });

     

      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah3/15", async (req, res) => {        
        const options = {
            sort: { "aqeedah3Total": -1 }
          };
        const result = await aqeedah_15_list.find({"aqeedah3data":{$ne:null}}, options).toArray();
        res.send(result);
      });


      //  total mark
      http://localhost:5000/level3/13
      app.put("/15aqeedah3total/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await aqeedah_15_list.findOne(filter);
        const updateDocument = await {  
          $set : {'aqeedah3Total' : getStud.aqeedah3data[0].Score +
                                    getStud.aqeedah3data[1].Score + 
                                    getStud.aqeedah3data[2].Score + 
                                    getStud.aqeedah3data[3].Score } ,
        }    
        const result = await aqeedah_15_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // update aqeedah3Data
      //http://localhost:5000/level3/13
      app.put("/certificate/aqeedah15/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : req.body,
        }    
        const result = await aqeedah_15_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
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

      // leaderboard
      // http://localhost:5000/aqeedah_16/afrin
      app.get("/leaderboard/aqeedah3/14", async (req, res) => {
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

       
      // ****************************
      //    fiqh 1 -  Batch 21
      // ******************************  

      //get count
      http://localhost:5000/count/fiqh/17
      app.get("/count/fiqh/1", async (req, res) => {
        const result = await fiqh_1_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

    //   searchbar by name 
    // http://localhost:5000/fiqh_17/afrin
      app.get("/fiqh/1/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await fiqh_1_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/fiqh/1/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await fiqh_1_list.findOne(query);
        res.send(result);
      });

      //create a new stud
    // http://localhost:5000/product
    app.post("/register/fiqh/1", async (req, res) => {
      const stud = req.body;
      const result = await fiqh_1_list.insertOne(stud);
      res.send({ success: true, result});
    });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/fiqh1/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh1data.${[0]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/fiqh1/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh1data.${[1]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/fiqh1/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh1data.${[2]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/fiqh1/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh2data.${[0]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      
      app.put("/fiqh1/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh2data.${[1]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/fiqh1/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`fiqh2data.${[2]}`] : req.body } ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/fiqh/1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/fiqh1/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await fiqh_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'fiqh1Total' : getStud.fiqh1data[0].Score +
                                    getStud.fiqh1data[1].Score + 
                                    getStud.fiqh1data[2].Score} ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/fiqh1/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await fiqh_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'fiqh2Total' : getStud.fiqh2data[0].Score +
                                    getStud.fiqh2data[1].Score + 
                                    getStud.fiqh2data[2].Score} ,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/fiqh1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard fetch
      // http://localhost:5000/fiqh_16/afrin
      app.get("/leaderboard/fiqh1/1", async (req, res) => {
        const query = {};
        const options = {
            sort: { "fiqh1Total": -1 }
          };
        const result = await fiqh_1_list.find(query, options).toArray();
        res.send(result);
      });

      app.get("/leaderboard/fiqh2/1", async (req, res) => {       
        const options = {
            sort: { "fiqh2Total": -1 }
          };
        const result = await fiqh_1_list.find({"fiqh2data":{$ne:null}}, options).toArray();
        res.send(result);
      });

      //http://localhost:5000/level3/13
      app.put("/fiqh1/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'fiqhCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/fiqh1/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'fiqhCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await fiqh_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });





      // ****************************
      //    seerat 1 -  Batch 21
      // ******************************  

      //get count
      http://localhost:5000/count/seerat/17
      app.get("/count/seerat/1", async (req, res) => {
        const result = await seerat_1_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

    //   searchbar by name 
    // http://localhost:5000/seerat_17/afrin
      app.get("/seerat/1/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await seerat_1_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/seerat/1/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await seerat_1_list.findOne(query);
        res.send(result);
      });

       //create a new stud
    // http://localhost:5000/product
    app.post("/register/seerat/1", async (req, res) => {
      const stud = req.body;
      const result = await seerat_1_list.insertOne(stud);
      res.send({ success: true, result});
    });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/seerat1/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat1data.${[0]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/seerat1/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat1data.${[1]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/seerat1/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat1data.${[2]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/seerat1/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat2data.${[0]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      
      app.put("/seerat1/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat2data.${[1]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/seerat1/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`seerat2data.${[2]}`] : req.body } ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/seerat/1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/seerat1/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await seerat_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'seerat1Total' : getStud.seerat1data[0].Score +
                                    getStud.seerat1data[1].Score + 
                                    getStud.seerat1data[2].Score} ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/seerat1/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await seerat_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'seerat2Total' : getStud.seerat2data[0].Score +
                                    getStud.seerat2data[1].Score + 
                                    getStud.seerat2data[2].Score} ,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/seerat1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard fetch
      // http://localhost:5000/seerat_16/afrin
      app.get("/leaderboard/seerat1/1", async (req, res) => {
        const query = {};
        const options = {
            sort: { "seerat1Total": -1 }
          };
        const result = await seerat_1_list.find(query, options).toArray();
        res.send(result);
      });

      app.get("/leaderboard/seerat2/1", async (req, res) => {       
        const options = {
            sort: { "seerat2Total": -1 }
          };
        const result = await seerat_1_list.find({"seerat2data":{$ne:null}}, options).toArray();
        res.send(result);
      });

      //http://localhost:5000/level3/13
      app.put("/seerat1/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'seeratCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/seerat1/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'seeratCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await seerat_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });



      // ****************************
      //    tafseer 1 -  Batch 21
      // ******************************  

      //get count
      http://localhost:5000/count/tafseer/17
      app.get("/count/tafseer/1", async (req, res) => {
        const result = await tafseer_1_list.countDocuments();
        res.status(200).json({'success' : true, 'result': result})
      });

    //   searchbar by name 
    // http://localhost:5000/tafseer_17/afrin
      app.get("/tafseer/1/:name", async (req, res) => {
        const name = req.params.name.toLowerCase();
        const query = {name : {$regex :name}};
        const options = {
            sort: { "sn": 1 }
          };
        const result = await tafseer_1_list.find(query, options).toArray();
        res.send(result);
      });

      //get by sn
      http://localhost:5000/student/13
      app.get("/tafseer/1/sn/:sn", async (req, res) => {
        const sn = parseInt(req.params.sn);
        const query = {sn : sn};
        const result = await tafseer_1_list.findOne(query);
        res.send(result);
      });

       //create a new stud
    // http://localhost:5000/product
    app.post("/register/tafseer/1", async (req, res) => {
      const stud = req.body;
      const result = await tafseer_1_list.insertOne(stud);
      res.send({ success: true, result});
    });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/tafseer1/level1/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer1data.${[0]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/tafseer1/level1/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer1data.${[1]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/tafseer1/level1/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer1data.${[2]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/tafseer1/level2/exm1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer2data.${[0]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      
      app.put("/tafseer1/level2/exm2/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer2data.${[1]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });
      app.put("/tafseer1/level2/exm3/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : { [`tafseer2data.${[2]}`] : req.body } ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });


      // update filed 
      http://localhost:5000/levelOne/13
      app.put("/payment/tafseer/1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      //  total mark
      http://localhost:5000/level3/13
      app.put("/tafseer1/level1/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await tafseer_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'tafseer1Total' : getStud.tafseer1data[0].Score +
                                    getStud.tafseer1data[1].Score + 
                                    getStud.tafseer1data[2].Score} ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      http://localhost:5000/level3/13
      app.put("/tafseer1/level2/leaderboard/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn};
        const getStud = await tafseer_1_list.findOne(filter);
        const updateDocument = await {  
          $set : {'tafseer2Total' : getStud.tafseer2data[0].Score +
                                    getStud.tafseer2data[1].Score + 
                                    getStud.tafseer2data[2].Score} ,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // promote to level2+3 
      http://localhost:5000/levelOne/13
      app.put("/accessLevelTwo/tafseer1/:sn", async (req, res) => {      
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set :  req.body,
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      // leaderboard fetch
      // http://localhost:5000/tafseer_16/afrin
      app.get("/leaderboard/tafseer1/1", async (req, res) => {
        const query = {};
        const options = {
            sort: { "tafseer1Total": -1 }
          };
        const result = await tafseer_1_list.find(query, options).toArray();
        res.send(result);
      });

      app.get("/leaderboard/tafseer2/1", async (req, res) => {       
        const options = {
            sort: { "tafseer2Total": -1 }
          };
        const result = await tafseer_1_list.find({"tafseer2data":{$ne:null}}, options).toArray();
        res.send(result);
      });

      //http://localhost:5000/level3/13
      app.put("/tafseer1/level1/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'tafseerCourseCertificates.level1' : req.body.certificate},
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
        res.send({ success: true, result});
      });

      app.put("/tafseer1/level2/certificate/:sn", async (req, res) => {   
        const sn = parseInt(req.params.sn);
        const filter = {sn : sn}; 
        const updateDocument = {
          $set : {'tafseerCourseCertificates.level2' : req.body.certificate},
        }    
        const result = await tafseer_1_list.updateOne(filter, updateDocument);      
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
