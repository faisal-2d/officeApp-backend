// userModel.js
const connectDB = require('../utils/db');

async function registerStudent(student, batch_no) {
    console.log(student, batch_no);
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const result = await users.insertOne(student);
    return result;
}
async function getStudents(batch_no) {
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const usersArray = await users.find().toArray();    
    return usersArray;
}
async function getStudentByName(batch_no, name) {
    const query = {name : {$regex :name}}; 
    const options = {
        sort: { "sn": 1 }
      };   
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const usersArray = await users.find(query, options).toArray();
    return usersArray;
}
async function getStudentById(batch_no, sn) {
    const query = {sn : sn};    
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const result = await users.findOne(query);
    return result;
}
async function getTotalStudents(batch_no) {
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const totalStudents = users.countDocuments();
    return totalStudents;
}
async function updateResult(batch_no, level, exm, sn, score) {
    const filter = {sn : sn}; 
    const updateDocument = {
        $set : { [`seerat${level}data.${[exm-1]}`] : score } ,
      }
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const result = await users.updateOne(filter, updateDocument);      
    return result;
}
async function updatePayment(batch_no, sn, payment) {
    const filter = {sn : sn}; 
    const updateDocument = {
        $set :  payment,
      } 
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);
    const result = await users.updateOne(filter, updateDocument);      
    return result;
}
async function updateLeaderboard(batch_no, level, sn) {
    const filter = {sn : sn}; 

    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);    
    const getStud = await users.findOne(filter);

    const scores = `seerat${level}data`;
    const totalScores = `seerat${level}Total`;

    console.log(getStud);
    console.log(scores);
    console.log(totalScores);

    let totalScore = 0;
    for (const data of getStud[scores]) {
      totalScore += data.Score;
    }
  
    // Construct the update document
    const updateDocument = await {
      $set: { [totalScores] : totalScore },
    };
  
    // Update the document in the collection
    const result = await users.updateOne(filter, updateDocument);
  
    return result;     
}
async function getLeaderboard(batch_no, level) {
    const options = {
        sort: { [`seerat${level}Total`]: -1 }
      }; 
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);    
    const result = await users.find({[`seerat${level}data`]:{$ne:null}}, options).toArray();
    return result;     
}
async function accessLevelTwo(batch_no, sn, data) {
    const filter = {sn : sn};
    const updateDocument = {
        $set :  data,
    };
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);  
    const result = await users.updateOne(filter, updateDocument);      
    return result;     
}
async function certificateUpload(batch_no, level, sn, certificate) {
    const filter = {sn : sn};
    const updateDocument = {
        $set : {[`seeratCourseCertificates.level${level}`] : certificate},
      } 
    const db = await connectDB("seerat");
    const users = db.collection(`seerat_${batch_no}_list`);  
    const result = await users.updateOne(filter, updateDocument);      
    return result;     
}


module.exports = { registerStudent, getStudents, getStudentByName, getStudentById, getTotalStudents, updateResult, updatePayment, updateLeaderboard, getLeaderboard, accessLevelTwo, certificateUpload };
