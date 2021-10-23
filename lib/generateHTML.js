// Requirements for path and writing HTML files
const fs = require('fs');
const path = require('path');
const templatesDir = path.resolve(__dirname, "../templates");

// Copies employee information from inquierer and pushes it into the html page one by one
const render = employees => {
    const html=[];

    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
    );

    return renderPage(html.join(""));
};

// Code to replace "handlebars" in the html template snippets
const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"),"utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};
const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"),"utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};
const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"),"utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

// Renders html document once complete replacing templates for each employee
const renderPage = html => {
    const template =fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    console.log('Page Rendered in "outputs" folder');
    return replacePlaceholders(template, "team", html);
};
// Function to replace placeholders in document
const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern,value);
};

module.exports = render