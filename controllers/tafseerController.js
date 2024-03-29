// usersController.js
const tafseerModel = require('../models/tafseerModel');

async function registerStudent(req, res) {
    const batch_no = req.params.batch;
    const student = req.body;

    try {
        await tafseerModel.registerStudent(student, batch_no);
        res.status(201).send('Student registered successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getStudents(req, res) {
    const batch_no = req.params.batch;
    try {
        const users = await tafseerModel.getStudents(batch_no);
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
        const users = await tafseerModel.getStudentByName(batch_no, name);
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
        const users = await tafseerModel.getStudentById(batch_no, sn);
        res.status(201).send(users);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getTotalStudents(req, res) {
    const batch_no = req.params.batch;
    try {
        const result = await tafseerModel.getTotalStudents(batch_no);
        res.status(200).json({'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateResult(req, res) {
    const batch_no = req.params.batch;
    const level = parseInt(req.params.level);
    const exm = parseInt(req.params.exm);
    const sn = parseInt(req.params.sn);
    const score = req.body;
    try {
        const result = await tafseerModel.updateResult(batch_no, level, exm, sn, score);
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
        const result = await tafseerModel.updatePayment(batch_no, sn, payment);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateLeaderboard(req, res) {
    const batch_no = req.params.batch;
    const level = parseInt(req.params.level);
    const sn = parseInt(req.params.sn);

    try {
        const result = await tafseerModel.updateLeaderboard(batch_no, level, sn);
        res.status(200).send({'sn': sn ,'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function getLeaderboard(req, res) {
    const batch_no = req.params.batch;
    const level = parseInt(req.params.level);


    try {
        const result = await tafseerModel.getLeaderboard(batch_no, level);
        res.status(200).send({'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function accessLevelTwo(req, res) {
    const sn = parseInt(req.params.sn);
    const batch_no = req.params.batch;
    const data = req.body;
    try {
        const result = await tafseerModel.accessLevelTwo(batch_no, sn, data);
        res.status(200).send({'success' : true, 'result': result})
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
        const result = await tafseerModel.certificateUpload(batch_no, level, sn, certificate);
        res.status(200).send({'success' : true, 'result': result})
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { registerStudent, getStudents, getStudentByName, getStudentById, getTotalStudents, updateResult, updatePayment, updateLeaderboard, getLeaderboard, accessLevelTwo, certificateUpload };
