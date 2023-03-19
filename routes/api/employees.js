const express = require('express');
const router = express.Router();
const data = {};
data.employees =  require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        //TODO: Add a user
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res, next) => {
        let id = 0;
        req.body.id ? id = req.body.id - 1 : next(new Error('Need to add an id property'));
        if(data.employees[id] === undefined){next(new Error('id specified does not exist'))};
        //TODO: it only accepts 1 property, change it for more.
        req.body.firstname ? data.employees[id].firstname = req.body.firstname
            : req.body.lastname ? data.employees[id].lastname = req.body.lastname
                : next(new Error('Property does not exist'));

        res.json(data.employees);
    })
    .delete((req, res, next) => {
        let index = req.body.id-1;

        // delete employee
        data.employees[index] !== undefined
        ? data.employees.splice(index,1)
            : next(new Error('Employee does not exist'));
        
        // reassign id's
        data.employees.forEach((employee, index) => {
            employee.id = index + 1;
        });

        //show employees
        res.json(data.employees)
    });

router.route('/:id')
    .get((req, res, next) => {
        data.employees[req.params.id-1] !== undefined
        ? res.json(data.employees[req.params.id-1])
            : next(new Error('Employee does not exist'));
    });

module.exports = router;