const express = require('express');
const router = express.Router();
const controller = require('../../controllers/employeesController');

router
    .route('/')
    .get(controller.getAllEmployees)
    .post(controller.postEmployee)
    .put(controller.updateEmployee)
    .delete(controller.deleteEmployee);
router.route('/:id').get(controller.getEmployee);

module.exports = router;
