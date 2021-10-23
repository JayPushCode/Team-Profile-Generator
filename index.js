// Requirements for Applicaitons
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Path to move output to 'output' folder to not overwrite any html
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// render imports, and team array construction

const render = require("./lib/generateHTML");
const Employee = require("./lib/Employee");
const teamArr = [];

// Employee questions
function employeeQuestions(answers){
  inquirer.prompt([
      {
        type: "input",
        message: "Please enter the team member's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the team member's ID:",
        name: "id",
      },
      {
        type: "input",
        message: "Please enter the team member's email:",
        name: "email",
      },
      {
        type: "list",
        message: "Please enter the team member's role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
      },
    ])
    .then(function (answers) {
      if (answers.role === "Engineer") {
        engineerQuestions(answers);
      } else if (answers.role === "Intern") {
        internQuestions(answers);
      } else {
        managerQuestions(answers);
      }
    });
}

// Additional questions for managers

function managerQuestions(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the manager's office number:",
        name: "officeNumber",
      },
      {
        type: "confirm",
        message: "Okay, would you like to add another team member?",
        name: "newMember",
      },
    ])
    .then(function (data) {
      console.log(answers)
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        data.officeNumber,
      );
      teamArr.push(newManager);
      if (data.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
      }
    });
}
// Additional questions for engineers
function engineerQuestions(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the engineer's GitHub user name?",
        name: "github",
      },
      {
        type: "confirm",
        message: "Okay, would you like to add another team member?",
        name: "newMember",
      },
    ])
    .then(function (data) {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        data.github
      );
      teamArr.push(newEngineer);
      if (data.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log("Team Created!");
      }
    });
}
// Additional questions for interns
function internQuestions(answers) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Where does this intern attend school?",
        name: "school",
      },
      {
        type: "confirm",
        message: "Okay, would you like to add another team member?",
        name: "newMember",
      },
    ])
    .then(function (data) {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        data.school
      );
      teamArr.push(newIntern);
      if (data.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log("Team Created!");
      }
    });
}
// Function to build the team after user is finished adding people to the array

function buildTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, render(teamArr), (err) =>  {
    if (err) throw err;
  });
}

employeeQuestions();
