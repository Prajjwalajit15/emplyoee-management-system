const form = document.getElementById("form");
const recordsContainer = document.getElementById("records-container");

let emId = 1000;
 const onSubmitForm = (event) =>{
    event.preventDefault();
    const employee = {
        name : event.target.name.value,
        employeeId : ++emId,
        salary: event.target.salary.value,
        team: event.target.team.value,
        role: event.target.role.value,
        companyName: event.target.companyName.value
    }
    addNewEmployeeRecords(employee);
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
    editIcon.className = "material-icons";
    editIcon.innerText = "edit";
    
    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons";
    deleteIcon.innerText = "delete";

    optionCell.append(editIcon,deleteIcon);

    record.appendChild(optionCell);

    recordsContainer.appendChild(record);
 }

 form.addEventListener("submit",onSubmitForm);
