const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
    // finds all documents and recieves a json response
    res.json(await Employee.find({}))
}

const createNewEmployee = async (req, res) => {
    const newEmployee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    //check that fields are filled
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    try {
        //create & store the new employee
        const result = await Employee.create({ 
            "firstname": newEmployee.firstname, 
            "lastname": newEmployee.lastname 
        });
        //feedback
        console.log(result);
        res.status(201).json({ success: `New employee ${newEmployee.firstname} created!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

const updateEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID required.'});
    let id = req.params.id;
    const employee = await Employee.findById(id).exec();
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    await Employee.findByIdAndUpdate(id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    res.json(await Employee.find({}))
}

const deleteEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID required.'});
    let id = req.params.id;
    const employee = await Employee.findById(id).exec();
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    await Employee.findByIdAndDelete(id)
    res.json(await Employee.find({}))
}

const getEmployee = async (req, res) => {
    
    const employee = await Employee.findById(req.params.id).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}