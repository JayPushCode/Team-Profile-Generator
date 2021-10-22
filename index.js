const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/generateHTML");
const Employee = require("./lib/Employee");
const teamArr = [];

function employeeQuestions(){
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
    .then(function (answers) {
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber,
      );
      teamArr.push(newManager);
      if (answers.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
      }
    });
}

function engineerQuestions(employeeQuestions) {
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
    .then(function (answers) {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamArr.push(newEngineer);
      if (answers.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log("Team Created!");
      }
    });
}

function internQuestions(employeeQuestions) {
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
    .then(function (answers) {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamArr.push(newIntern);
      if (answers.newMember === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log("Team Created!");
      }
    });
}

function buildTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, render(teamArr));
}

employeeQuestions();