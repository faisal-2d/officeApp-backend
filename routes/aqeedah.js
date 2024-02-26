// users.js
const express = require('express');
const router = express.Router();
const aqeedahController = require('../controllers/aqeedahController');

router.get('/:batch', aqeedahController.getStudents);
router.get('/:batch/:name', aqeedahController.getStudentByName);
router.get('/:batch/count', aqeedahController.getTotalStudents);
router.get('/:batch/sn/:sn', aqeedahController.getStudentById);


//register new student
router.post('/:batch/register', aqeedahController.registerStudent);


//payment
router.put('/:batch/payment/:sn', aqeedahController.updatePayment)


// result update Exm: 1,2,3, Level 1,3
router.put('/:batch/:level/:exm/:sn', aqeedahController.updateResult)

//leaderboard get
router.get('/leaderboard/get/:batch/:level/', aqeedahController.getLeaderboard);


//leaderboard update
router.put('/leaderboard/update/:batch/:level/:sn', aqeedahController.updateLeaderboard)

router.put('/accessLevelTwo/:batch/:sn', aqeedahController.accessLevelTwo)


//certificate
router.put('/certificate/upload/:batch/:level/:sn', aqeedahController.certificateUpload)

module.exports = router;
