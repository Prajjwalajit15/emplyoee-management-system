const form = document.getElementById("form");
const recordsContainer = document.getElementById("records-container");
const createButtton = document.querySelector("#form button");

let fromState = 'CREATE';


const employeeList = [];
let emId = 1000;
 const onSubmitForm = (event) =>{
    event.preventDefault();
    const employee = {
        employeeId : ++emId,
        name : event.target.name.value, 
        salary: event.target.salary.value,
        role: event.target.role.value,
        team: event.target.team.value, 
        companyName: event.target.companyName.value
    }
    if (fromState==="CREATE") {
        addNewEmployeeRecords(employee);
    }
     else if(fromState==="UPDATE"){
        fromState="CREATE";
        createButtton.innerText = "Create Employee"
     }
    form.reset();
 }

 function deleteRecord(event){

    if (fromState==="UPDATE") {
        alert("please update the record before deleting anything");
        return;
    }

    const deleteButton = event.target;
    const record = deleteButton.parentNode.parentNode;
    record.remove();

    const currentEmployeeId = parseInt(deleteButton.getAttribute("data-emid"));

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employeeId===currentEmployeeId) {
           employeeList.splice(i,1);
           break;
        } 
    }
 }

 function fillFormWithData(employee){
    for (const key in employee) { 
        if (key!= "employeeId") {
            form[key].value = employee[key];
        } 
    }
    createButtton.innerText = "Update Employee";
    fromState='UPDATE';
 }

function editRecords(){
    const editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-emid"));
    for (let i = 0; i < employeeList.length; i++) {
        if (currentEmployeeId===employeeList[i].employeeId) {
          fillFormWithData(employeeList[i]);
           break;
        } 
    }
}

 function addNewEmployeeRecords(employee){
    // create table row append inside thead(records-container)
    const record = document.createElement("tr");

    for(let key in employee){
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.appendChild(cell);
    }

    const optionCell = document.createElement("td");

    const editIcon = document.createElement("span");
    editIcon.className = "material-icons icon";
    editIcon.innerText = "edit";
    editIcon.setAttribute("data-emId",employee.employeeId);
    editIcon.addEventListener("click",editRecords);

    
    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons icon";
    deleteIcon.innerText = "delete";
    deleteIcon.setAttribute("data-emId",employee.employeeId);
    deleteIcon.addEventListener("click",deleteRecord);

    optionCell.append(editIcon,deleteIcon);

    record.appendChild(optionCell);

    recordsContainer.appendChild(record);
    employeeList.push(employee);
 }

 form.addEventListener("submit",onSubmitForm);
