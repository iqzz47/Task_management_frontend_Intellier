// script.js

// Function to fetch data from the FastAPI backend
async function fetchData() {
    try {
      const response = await fetch('http://127.0.0.1:8000/readalltask', {
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
      updateTable(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to update the HTML table with fetched data
  function updateTable(data) {
    const tableBody = document.getElementById('tableBody2');
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
  // Call the fetchData function when the page loads
  document.addEventListener('DOMContentLoaded', fetchData);
  