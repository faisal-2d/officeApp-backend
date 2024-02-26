// userModel.js
const connectDB = require('../utils/db');

async function createUser(name, email) {
    console.log(name, email);
    const db = await connectDB("users");
    const users = db.collection('all_users');
    return users.insertOne({ name, email });
}
async function getUsers() {
    const query = {}; 
    const options = {
        sort: { "sn": 1 }
     };
    const db = await connectDB("users");
    const users = db.collection('all_users');
    const usersArray = await users.find(query, options).toArray();    
    return usersArray;
}
async function getUser(name) {
    const query = {name : {$regex :name}};    
    const db = await connectDB("users");
    const users = db.collection('all_users');
    const usersArray = users.find(query).toArray();
    return usersArray;
}
async function getAdmin(email) {
    const query = {email : email};    
    const db = await connectDB("users");
    const users = db.collection('all_users');
    const user = await users.findOne(query);
    if (user?.role === 'admin') {
        return { isAdmin: true};    
      }
    else {

        return usersArray;
    }
}
async function getModerator(email) {
    const query = {email : email};    
    const db = await connectDB("users");
    const users = db.collection('all_users');
    const user = await users.findOne(query);
    if (user?.role2 === 'moderator') {
        return { isAdmin: true};    
      }
    else {

        return usersArray;
    }
}
async function getAssitant(email) {
    const query = {email : email};    
    const db = await connectDB("users");
    const users = db.collection('all_users');
    const user = await users.findOne(query);
    if (user?.role3 === 'assistant') {
        return { isAdmin: true};    
      }
    else {

        return usersArray;
    }
}


module.exports = { createUser, getUsers, getUser, getAdmin, getModerator, getAssitant };
