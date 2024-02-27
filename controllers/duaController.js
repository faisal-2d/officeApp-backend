// usersController.js
const duaModel = require('../models/duaModel');

async function registerStudent(req, res) {
    const batch_no = req.params.batch;
    const student = req.body;
   
    try {
        await duaModel.registerStudent(student, batch_no);
        res.status(201).send('Student registered successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getStudents(req, res) {
    const batch_no = req.params.batch;
    try {
        const users = await duaModel.getStudents(batch_no);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getStudentByName(req, res) {

    const batch_no = req.params.batch;
    const name = req.params.name.toLowerCase();
    try {
        const users = await duaModel.getStudentByName(batch_no, name);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getStudentById(req, res) {

    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    try {
        const users = await duaModel.getStudentById(batch_no, sn);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getTotalStudents(req, res) {
    const batch_no = req.params.batch;
    try {
        const result = await duaModel.getTotalStudents(batch_no);
        res.status(200).json({'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateDua(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    const info = req.body;

    try {
        const result = await duaModel.updateDua(batch_no, sn, info);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateReport(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    const info = req.body;

    try {
        const result = await duaModel.updateReport(batch_no, sn, info);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updatePayment(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    const payment = req.body;
    try {
        const result = await duaModel.updatePayment(batch_no, sn, payment);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateGems(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    const info = req.body;


    try {
        const result = await duaModel.updateGems(batch_no, sn, info);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateCompletion(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);

    try {
        const result = await duaModel.updateCompletion(batch_no, sn);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateDate(req, res) {
    const batch_no = req.params.batch;
    const sn = parseInt(req.params.sn);
    const info = req.body;

   
    try {
        const result = await duaModel.updateGems(batch_no, sn, info);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function certificateUpload(req, res) {
    const batch_no = req.params.batch;
    const level = parseInt(req.params.level);
    const sn = parseInt(req.params.sn);
    const certificate = req.body.certificate;


    try {
        const result = await duaModel.certificateUpload(batch_no, level, sn, certificate);
        res.status(200).send({'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { registerStudent, getStudents, getStudentByName, getStudentById, getTotalStudents, updateDua, updateReport, updateGems, updateDate, updatePayment, certificateUpload, updateCompletion };
