var mysql = require("mysql");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const Department = require("./lib/department")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "deuX17**",
  database: "companyDB"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function addNewEmployee(first_name, last_name, role_id, manager_id) {
  console.log("Adding a new employee...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
    }
  );
}

function addNewRole(role_id, title, salary, department_id) {
  console.log("Adding a new role...\n");
  var query = connection.query(
    "INSERT INTO role SET ?",
    {
      role_id: role_id,
      title: title,
      salary: salary,
      department_id: department_id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
    }
  );
}

function addNewDepartment(department_id, name) {
  console.log("Adding a new department...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      department_id: department_id,
      name: name
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
    }
  );
}

function updateEmployee(id, updateSection, update) {
  console.log("Updating Employee...\n");
  //if statement for what updateSection is equal to?
  //prompt in start() for list of things to update?
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        id: id
      },
      {
        updateSection: update
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee updated!\n");
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}

function readEmployeeList() {

  let employeesList = "SELECT * FROM employee";

  connection.query(employeesList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
  });
}

function readRoleList() {

  let roleList = "SELECT * FROM role";

  connection.query(roleList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
  });
}

function readDepartmentList() {

  let departmentList = "SELECT * FROM department";

  connection.query(departmentList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
  });
}

function start() {
  readEmployeeList();

  inquirer.prompt([
  {
      type: "list",
      name: "initialmenu",
      message: "Please Select from the options below:",
      choices: [
        "Add a New Employee",
        "Add a New Role",
        "Add a New Department",
        "Update an Existing Employee",
        "View Full Employee List",
        "View Full Role List",
        "View Full Department List",
        "Exit"
      ]
  }
]).then(function(choice){
  if(choice.initialmenu === "Add a New Employee"){
    inquirer.prompt([
      {
        type: "input",
        name: "firstname",
        message: "Enter in the Employee's First Name: "
      },
      {
        type: "input",
        name: "lastname",
        message: "Enter in the Employee's Last Name: "
      },
      {
        type: "input",
        name: "roleid",
        message: "Enter in the Role ID for this employee: "
      },
      {
        type: "input",
        name: "managerid",
        message: "Enter in this employee's manager's ID: "
      }
    ]).then(function(employeeInfo){
      let newFirstName = employeeInfo.firstname;
      let newLastName = employeeInfo.lastname;
      let newRoleId = employeeInfo.roleid;
      let newManagerId = employeeInfo.managerid;

      addNewEmployee(newFirstName, newLastName, newRoleId, newManagerId);
    }) 
  } else if (choice.initialmenu === "Add a New Role") {
    inquirer.prompt([
      {
        type: "input",
        name: "role",
        message: "Enter in the new Role ID: "
      },
      {
        type: "input",
        name: "title",
        message: "Enter in the Title for this Role: "
      },
      {
        type: "input",
        name: "salary",
        message: "Enter in the Salary for this Role: "
      },
      {
        type: "input",
        name: "department",
        message: "Enter in the Department that this role falls under: "
      }
    ]).then(function(roleInfo){
      let newRole = roleInfo.role;
      let newTitle = roleInfo.title;
      let newSalary = roleInfo.salary;
      let roleDepartment = roleInfo.department; 

      addNewRole(newRole, newTitle, newSalary, roleDepartment);
    })
  } else if (choice.initialmenu === "Add a New Department") {
    inquirer.prompt([
      {
        type: "input",
        name: "departmentid",
        message: "Enter in the new Department ID: "
      },
      {
        type: "input",
        name: "departmentname",
        message: "Enter in the Name of the Department: "
      }
    ]).then(function(departmentInfo){
      let newDepartmentId = departmentInfo.departmentid;
      let newDepartment = departmentInfo.departmentname; 

      addNewDepartment(newDepartmentId, newDepartment);
    })
  } else if (choice.initialmenu === "Update an Existing Employee") {
    
  } else if (choice.initialmenu === "View Full Employee List") {
    readEmployeeList();
  } else if (choice.initialmenu === "View Full Role List") {
    readRoleList();
  } else if (choice.initialmenu === "View Full Department List") {
    readDepartmentList();
  } else if (choice.initialmenu === "Exit") {
    connection.end();
  } else {
    readEmployeeList();
  }
})
};