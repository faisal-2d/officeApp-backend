// users.js
const express = require('express');
const router = express.Router();
const tafseerController = require('../controllers/tafseerController');

router.get('/:batch', tafseerController.getStudents);
router.get('/:batch/:name', tafseerController.getStudentByName);
router.get('/count/get/:batch', tafseerController.getTotalStudents);
router.get('/:batch/sn/:sn', tafseerController.getStudentById);


//register new student
router.post('/:batch/register', tafseerController.registerStudent);


//payment
router.put('/:batch/payment/:sn', tafseerController.updatePayment)


// result update Exm: 1,2,3, Level 1,3
router.put('/:batch/:level/:exm/:sn', tafseerController.updateResult)

//leaderboard get
router.get('/leaderboard/get/:batch/:level/', tafseerController.getLeaderboard);


//leaderboard update
router.put('/leaderboard/update/:batch/:level/:sn', tafseerController.updateLeaderboard)

router.put('/accessLevelTwo/:batch/:sn', tafseerController.accessLevelTwo)


//certificate
router.put('/certificate/upload/:batch/:level/:sn', tafseerController.certificateUpload)

module.exports = router;
