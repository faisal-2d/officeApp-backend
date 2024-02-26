// usersController.js
const userModel = require('../models/userModel');

async function createUser(req, res) {
    const { name, email } = req.body;
    console.log(3, req.body);
    try {
        await userModel.createUser(name, email);
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getUser(req, res) {
    const name = req.params.name.toLowerCase();
     console.log("Name: ", name);
    try {
        const users = await userModel.getUser(name);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getAdmin(req, res) {
    const email = req.params.email.toLowerCase();
    try {
        const users = await userModel.getAdmin(email);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getModerator(req, res) {
    const email = req.params.email.toLowerCase();
    try {
        const users = await userModel.getModerator(email);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getAssitant(req, res) {
    const email = req.params.email.toLowerCase();
    try {
        const users = await userModel.getAssitant(email);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { createUser, getUsers, getUser, getAdmin, getModerator, getAssitant };
