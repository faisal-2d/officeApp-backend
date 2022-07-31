 
// node
// require('crypto').randomBytes(64).toString('hex')
 
 // get all sudents
      // http://localhost:5000/batch_16
      app.get("/aqeedah_:batch", async (req, res) => {
        const batch = req.params.batch;
        const batch_no = `aqeedah_${batch}_list`; 
          const query = {};
          const options = {
            sort: { "sn": 1 }
          };
          console.log(batch_no);
          const result = await aqeedah_16_list.find(query, options).toArray();
          console.log(batch_no);
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


/*******************
 *  Merit List
 * 
 * *****************/

       // Merit List
    // http://localhost:5000/merit_16
    app.get("/merit_16/:sn", async (req, res) => {
      const sn = parseInt(req.params.sn);
      const query = {sn : sn};
      const result = await aqeedah_16_list.findOne(query);
      console.log(result.aqeedah1data)
      res.send(result);
  });
  //Make Merit List
  // http://localhost:5000/merit_16
  app.put("/merit_16/:sn", async (req, res) => {
    const sn = parseInt(req.params.sn);
    const filter = {sn : sn};
    const options = { upsert : true };
    const updateUser = {
      // $set : req.body,
      $set : { [`aqeedah1data.${[3]}`] :  req.body},
    }    
    const result = await aqeedah_16_list.updateOne(filter, updateUser, options);      
    res.send({ success: true, result});
  });