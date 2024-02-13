
var currentLocation = window.location.href;
console.log('Current Location:', currentLocation);

// Extracting task code from the URL fragment identifier
const t_code= window.location.hash;
console.log(t_code)


// update.js

document.addEventListener("DOMContentLoaded", function () {
    var currentLocation = window.location.href;
console.log('Current Location:', currentLocation);

// Extracting task code from the URL fragment identifier
const t_code = window.location.hash.slice(1); // Remove the leading '#'
console.log('Task Code:', t_code);
const fBody = document.getElementById('fBody');
const fBody2 = document.getElementById('fBody2');
    
    // Make a GET request to your FastAPI endpoint with the task code
    fetch(`http://127.0.0.1:8000/readtaskbyt_code/%23${t_code}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
           
            console.log(data);
            updateForm(data, fBody,fBody2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});





function updateForm(data, fBody, fBody2) {
    const { t_code, taskname, assignedfrom, assignedto, createdate, duedate, status, duration } = data;

    const tCodeInput = fBody.querySelector('[name="T_Code"]');
    const taskNameInput = fBody.querySelector('[name="Task_Name"]');
    const tassignfrom = fBody2.querySelector('[name="from"]');
    const tassignto = fBody2.querySelector('[name="to"]');
    const cre = fBody2.querySelector('[name="dc"]');
    const dre = fBody2.querySelector('[name="dd"]');
    const st = fBody2.querySelector('[name="status"]');
    const dur = fBody2.querySelector('[name="dur"]');

    // Set the readOnly attribute to false for each input field
    if (tCodeInput) {
        tCodeInput.value = t_code;
        tCodeInput.readOnly = false;
    }
    if (taskNameInput) {
        taskNameInput.value = taskname;
        taskNameInput.readOnly = false;
    }
    if (tassignfrom) {
        tassignfrom.value = assignedfrom;
        tassignfrom.readOnly = false;
    }
    if (tassignto) {
        tassignto.value = assignedto;
        tassignto.readOnly = false;
    }
    if (cre) {
        cre.value = formatDate(createdate) || '';
        cre.readOnly = false;
    }
    if (dre) {
        dre.value = formatDate(duedate) || '';
        dre.readOnly = false;
    }
    if (st) {
        st.value = status || '';
        st.readOnly = false;
    }
    if (dur) {
        dur.value = duration || '';
        dur.readOnly = false;
    }

    // Log values for debugging
    console.log(cre.value);
}

function formatDate(dateTimeString) {
    // Assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format
    const datePart = dateTimeString.split('T')[0];
    return datePart;
}
