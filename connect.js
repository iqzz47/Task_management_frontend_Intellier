// Function to fetch data from the FastAPI backend
// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  // Get the employee ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const employeeID = urlParams.get('employeeID');

  // Use the employeeID as needed
  console.log("Employee ID:", employeeID);
  // ... rest of your dashboard page logic
});





async function fetchData(endpoint, tableBody) {
  try {
      const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
          method: 'GET',
          mode: 'cors',  // Enable CORS
          headers: {
              'Content-Type': 'application/json',
              // Add any other headers if needed
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Process the data and update the HTML table
      updateTable(data, tableBody);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to update the HTML table with fetched data
function updateTable(data, tableBody) {
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach((task, index) => {
      const row = `<tr>
                   <td>${index + 1}</td>
                   <td>${task.taskname}</td>
                   <td>${formatDate(task.createdate)}</td>
                   <td>${formatDate(task.duedate)}</td>
                   <td>${task.status}</td>
                 </tr>`;

      tableBody.innerHTML += row;
  });
}

function formatDate(dateTimeString) {
  // Assuming dateTimeString is in 'YYYY-MM-DDTHH:mm:ss' format
  const datePart = dateTimeString.split('T')[0];
  return datePart;
}

// Call the fetchData function for incomplete tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const tableBody1 = document.getElementById('tableBody');
  fetchData('readincompletetask', tableBody1);
});

// Call the fetchData function for complete tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const tableBody2 = document.getElementById('tableBody2');
  fetchData('readcompletetask', tableBody2);
});

document.addEventListener('DOMContentLoaded', () => {
  const tableBody3 = document.getElementById('tableBody3');
  fetchData('readonprogresstask', tableBody3);
});


document.addEventListener('DOMContentLoaded', () => {
  const tableBody4 = document.getElementById('tableBody4');
  fetchData('readcanceltask', tableBody4);
});

