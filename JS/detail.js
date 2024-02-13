// Function to fetch data from the FastAPI backend
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
                     <th><a href="update.html?t_code=${task.t_code}"" class="but" >Update</a><a href="report.html?t_code=${task.t_code}" class="but" >Delete</a></th>
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
    fetchData('readalltask', tableBody1);
  });
  
  