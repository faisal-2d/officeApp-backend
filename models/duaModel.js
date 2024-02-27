// userModel.js
const connectDB = require('../utils/db');

async function registerStudent(student, batch_no) {
    console.log(student, batch_no);
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const result = await users.insertOne(student);
    return result;
}
async function getStudents(batch_no) {
    const query = {}; 
    const options = {
        sort: { "sn": 1 }
     };
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const usersArray = await users.find(query, options).toArray();    
    return usersArray;
}
async function getStudentByName(batch_no, name) {
    const query = {name : {$regex :name}}; 
    const options = {
        sort: { "sn": 1 }
      };   
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const usersArray = await users.find(query, options).toArray();
    return usersArray;
}
async function getStudentById(batch_no, sn) {
    const query = {sn : sn};    
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const result = await users.findOne(query);
    return result;
}
async function getTotalStudents(batch_no) {
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const totalStudents = users.countDocuments();
    return totalStudents;
}
async function updateDate(batch_no, sn, info){
    const filter = {sn : sn}; 
    const date = info.date;
    
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const student = await users.findOne(filter);
    const student_date = student.todaysinfo.date;

    // reset 
    if(student_date < date ){
    const updateDocument = await {
          $set: {   [`todaysinfo.date`] : date,
                    [`todaysinfo.dua`] : 0,
                    [`todaysinfo.teaching`] : 0
        }, 
    };
    const result = await users.updateOne(filter, updateDocument);      
    return result;
    }
}
async function updateDua(batch_no, sn, info) {
    const filter = {sn : sn}; 

    const index = info.index;
    
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);    
    
    const updateDocument = {
        $set: { [`dua.${index}`] : 1,
        [`todaysinfo.dua`] : 1
    },    
    }
    const result = await users.updateOne(filter, updateDocument);      
    return result;
}
async function updateReport(batch_no, sn, info) {
    const filter = {sn : sn};

    const index = info.index;
    
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const student = await users.findOne(filter);

    const student_dua_info = student.todaysinfo.dua;
   
    const updateDocument = {
        $set: { [`report.${index}.teaching`] : 1,
                [`report.${index}.dua`] : student_dua_info,
                [`todaysinfo.teaching`] : 1
              },

    }
    const result = await users.updateOne(filter, updateDocument);      

    return result;
}


async function updateGems(batch_no, sn, info) {
    const filter = {sn : sn};

    const gems = info.gems;    
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    
    const updateDocument = await {
        $set: { [`gems`] : gems },
    };
    const result = await users.updateOne(filter, updateDocument);      
    return result;  
}

async function updateCompletion(batch_no, sn) {
    const filter = {sn : sn}; 

    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);    
    const getStud = await users.findOne(filter);

    let totalScore = 0;
    for (const data of getStud[dua]) {
      totalScore += data.Score;
    }
  
    // Construct the update document
    const updateDocument = await {
      $set: { [completion] : totalScore },
    };  
    const result = await users.updateOne(filter, updateDocument);  
    return result;    
}
async function updatePayment(batch_no, sn, payment) {
    const filter = {sn : sn}; 
    const updateDocument = {
        $set :  payment,
      } 
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);
    const result = await users.updateOne(filter, updateDocument);      
    return result;
}

async function certificateUpload(batch_no, level, sn, certificate) {
    const filter = {sn : sn};
    const updateDocument = {
        $set : {[`duaCourseCertificates.level${level}`] : certificate},
      } 
    const db = await connectDB("dua");
    const users = db.collection(`dua_${batch_no}_list`);  
    const result = await users.updateOne(filter, updateDocument);      
    return result;     
}

module.exports = { registerStudent, getStudents, getStudentByName, getStudentById, getTotalStudents, updateDua, updateReport, updatePayment, updateGems, updateDate, certificateUpload, updateCompletion };