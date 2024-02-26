// users.js
const express = require('express');
const router = express.Router();
const seeratController = require('../controllers/seeratController');

router.get('/:batch', seeratController.getStudents);
router.get('/:batch/:name', seeratController.getStudentByName);
router.get('/:batch/count', seeratController.getTotalStudents);
router.get('/:batch/sn/:sn', seeratController.getStudentById);


//register new student
router.post('/:batch/register', seeratController.registerStudent);


//payment
router.put('/:batch/payment/:sn', seeratController.updatePayment)


// result update Exm: 1,2,3, Level 1,3
router.put('/:batch/:level/:exm/:sn', seeratController.updateResult)

//leaderboard get
router.get('/leaderboard/get/:batch/:level/', seeratController.getLeaderboard);


//leaderboard update
router.put('/leaderboard/update/:batch/:level/:sn', seeratController.updateLeaderboard)

router.put('/accessLevelTwo/:batch/:sn', seeratController.accessLevelTwo)


//certificate
router.put('/certificate/upload/:batch/:level/:sn', seeratController.certificateUpload)

module.exports = router;
