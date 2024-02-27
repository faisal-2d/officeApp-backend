// users.js
const express = require('express');
const router = express.Router();
const arabicController = require('../controllers/arabicController');

router.get('/:batch', arabicController.getStudents);
router.get('/:batch/:name', arabicController.getStudentByName);
router.get('/count/get/:batch', arabicController.getTotalStudents);
router.get('/:batch/sn/:sn', arabicController.getStudentById);


//register new student
// router.post('/:batch/register', arabicController.registerStudent);


// //payment
// router.put('/:batch/payment/:sn', arabicController.updatePayment)


// // result update Exm: 1,2,3, Level 1,3
// router.put('/:batch/:level/:exm/:sn', arabicController.updateResult)

// //leaderboard get
// router.get('/leaderboard/get/:batch/:level/', arabicController.getLeaderboard);


// //leaderboard update
// router.put('/leaderboard/update/:batch/:level/:sn', arabicController.updateLeaderboard)

// router.put('/access/:batch/:sn', arabicController.accessLevelTwo)


// //certificate
// router.put('/certificate/upload/:batch/:level/:sn', arabicController.certificateUpload)

module.exports = router;
