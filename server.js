const mysql = require("mysql");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const Department = require("./lib/department");

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

  console.log(`
  ===========================================================================
  --WELCOME--WELCOME--WELCOME--WELCOME--WELCOME--WELCOME--WELCOME--WELCOME--
  ===========================================================================
  `);
  start();
});

function addNewEmployee(first_name, last_name, role_id, manager_id) {
  console.log("Adding a new employee...\n");
  var query = connection.query(
    `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`);

      console.log("New employee has been added");
      restart();
}

function addNewRole(thetitle, thesalary, thedepartmentid) {
  console.log("Adding a new role...\n");
  var query = connection.query(
    `INSERT INTO role(title, salary, department_id) VALUES ("${thetitle}", ${thesalary}, ${thedepartmentid});`);

      console.log("New role has been added");
      restart();
}

function addNewDepartment(departmentName) {
  console.log("Adding a new department...\n");
  var query = connection.query(
    `INSERT INTO department(name) VALUES ("${departmentName}");`);

      console.log("New Department has been added");
      restart();
}

//Show all employees in the system
function readEmployeeList() {
  let employeesList = "SELECT * FROM employee";

  connection.query(employeesList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
    start();
  });
}

//Show all roles in the system
function readRoleList() {
  let roleList = "SELECT * FROM role";

  connection.query(roleList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
    start();
  });
}

//Show all departments in the system
function readDepartmentList() {
  let departmentList = "SELECT * FROM department";

  connection.query(departmentList, function(error, response) {
    if (error) throw error;
    // Log all results of the SELECT statement
    console.table(response);
    start();
  });
}

function restart() {
  start();
}

//App start
function start() {
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
      let newTitle = roleInfo.title;
      let newSalary = roleInfo.salary;
      let roleDepartment = roleInfo.department; 

      addNewRole(newTitle, newSalary, roleDepartment);
    })
  } else if (choice.initialmenu === "Add a New Department") {
    inquirer.prompt([
      {
        type: "input",
        name: "departmentname",
        message: "Enter in the Name of the Department: "
      }
    ]).then(function(departmentInfo){
      let newDepartment = departmentInfo.departmentname; 

      addNewDepartment(newDepartment);
    })
  } else if (choice.initialmenu === "Update an Existing Employee") {
    inquirer.prompt([
      {
        type: "input",
        name: "updateId",
        message: "Please enter the ID of the employee you would like to update: "
      },
      {
        type: "list",
        name: "updateChoice",
        message: "Please select which information you would like to update: ",
        choices: [
          "First Name",
          "Last Name",
          "Role ID",
          "Manager ID"
        ]
      },
      {
        type: "input",
        name: "update",
        message: "Please enter in the updated information: "
      }
    ]).then(function(updateInfo){
      if(updateInfo.updateChoice === "First Name") {
        connection.query("SELECT FROM employee WHERE id = ?", updateInfo.updateId, function(err, res){
          if(err) throw err;

          connection.query("UPDATE employee SET first_name = ? WHERE id = ?", [updateInfo.update, updateInfo.updateId], function(err, res){
            if(err) throw err;

            console.log("Employee Successfully Updated!");
            restart();
          })
        })
      } else if(updateInfo.updateChoice === "Last Name") {
        connection.query("SELECT FROM employee WHERE id = ?", updateInfo.updateId, function(err, res){
          if(err) throw err;

          connection.query("UPDATE employee SET last_name = ? WHERE id = ?", [updateInfo.update, updateInfo.updateId], function(err, res){
            if(err) throw err;

            console.log("Employee Successfully Updated!");
            restart();
          })
        })
      } else if(updateInfo.updateChoice === "Role ID") {
        connection.query("SELECT FROM employee WHERE id = ?", updateInfo.updateId, function(err, res){
          if(err) throw err;

          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [updateInfo.update, updateInfo.updateId], function(err, res) {
            if(err) throw err;

            console.log("Employee Successfully Updated!");
            restart();
          })
        })
      } else if(updateInfo.updateChoice === "Manager ID") {
        connection.query("SELECT FROM employee WHERE id = ?", updateInfo.updateId, function(err, res){
          if(err) throw err;

          connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [updateInfo.update, updateInfo.updateId], function(err, res){
            if(err) throw err;

            console.log("Employee Successfully Updated!");
            restart();
          })
        })
      } else {
        restart();
      }
    })
  } else if (choice.initialmenu === "View Full Employee List") {
    readEmployeeList();
    
  } else if (choice.initialmenu === "View Full Role List") {
    readRoleList();
    
  } else if (choice.initialmenu === "View Full Department List") {
    readDepartmentList();

  } else if (choice.initialmenu === "Exit") {
    connection.end();
  } 
})
};