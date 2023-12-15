const data = {
    employees: require('../model/employees.json'),
    setEmployees(data) {
        this.employees = data;
    },
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const postEmployee = (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ message: 'First and last names are required.' });
    }
    const newEmployee = {
        id: data.employees.length ? data.employees.length + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    };
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
    if (!employee) res.status(400).json({ message: `Empolyee ID: ${req.body.id} not found.` });
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredList = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
    filteredList.splice(parseInt(req.body.id) - 1, 0, employee);
    data.setEmployees(filteredList);
    res.json(data.employees);
};

const deleteEmployee = (req, res) => {
    const deletedEmp = data.employees.find((emp) => emp.id === parseInt(req.body.id));
    if (!deletedEmp) res.status(400).json({ message: `Empolyee ID: ${req.body.id} not found.` });
    const filtered = data.employees.filter((emp) => {
        return emp.id !== parseInt(req.body.id);
    });
    filtered.map((emp, ind) => {
        return (emp.id = ind + 1);
    });
    data.setEmployees(filtered);
    res.json(data.employees);
};

const getEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
    if (!employee) res.status(400).json({ message: `Empolyee ID: ${req.params.id} not found.` });
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    postEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};
