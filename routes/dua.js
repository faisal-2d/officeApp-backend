// users.js
const express = require('express');
const router = express.Router();
const duaController = require('../controllers/duaController');

router.get('/:batch', duaController.getStudents);
router.get('/:batch/:name', duaController.getStudentByName);
router.get('/:batch/count', duaController.getTotalStudents);
router.get('/:batch/sn/:sn', duaController.getStudentById);


//register new student
router.post('/:batch/register', duaController.registerStudent);


//payment
router.put('/:batch/payment/:sn', duaController.updatePayment)


// result update Dua: 1,2,3,
router.put('/dua_update/:batch/:sn', duaController.updateDua)
router.put('/report_update/:batch/:sn', duaController.updateReport)


//gems update
router.put('/date/update/:batch/:sn', duaController.updateDate)
router.put('/gems/update/:batch/:sn', duaController.updateGems)
router.put('/completion/update/:batch/:sn', duaController.updateCompletion)


//certificate
router.put('/certificate/upload/:batch/:level/:sn', duaController.certificateUpload)

module.exports = router;
