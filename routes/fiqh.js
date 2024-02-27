// users.js
const express = require('express');
const router = express.Router();
const fiqhController = require('../controllers/fiqhController');

router.get('/:batch', fiqhController.getStudents);
router.get('/:batch/:name', fiqhController.getStudentByName);
router.get('/count/:batch', fiqhController.getTotalStudents);
router.get('/:batch/sn/:sn', fiqhController.getStudentById);


//register new student
router.post('/:batch/register', fiqhController.registerStudent);


//payment
router.put('/:batch/payment/:sn', fiqhController.updatePayment)


// result update Exm: 1,2,3, Level 1,3
router.put('/:batch/:level/:exm/:sn', fiqhController.updateResult)

//leaderboard get
router.get('/leaderboard/get/:batch/:level/', fiqhController.getLeaderboard);


//leaderboard update
router.put('/leaderboard/update/:batch/:level/:sn', fiqhController.updateLeaderboard)

router.put('/accessLevelTwo/:batch/:sn', fiqhController.accessLevelTwo)


//certificate
router.put('/certificate/upload/:batch/:level/:sn', fiqhController.certificateUpload)

module.exports = router;
