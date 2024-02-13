document.getElementById("btn").addEventListener("click", function () {
  // Collect data from the form fields
  var taskData = {
    // Update keys to match the expected keys in your FastAPI endpoint
    t_code: document.getElementById("TextInput1").value,
    taskname: document.getElementById("TextInput2").value,
    createdate: document.getElementById("ControlInput1").value+ 'T00:00:00',
    duedate: document.getElementById("ControlInput2").value+ 'T00:00:00', 
    duration: document.getElementById("TextInput3").value,
    status: "Incomplete",
    assignedfrom: document.getElementById("TextInput5").value,
    assignedto: document.getElementById("TextInput6").value,
  };

  // Make an HTTP POST request to the backend API
  fetch("http://127.0.0.1:8000/createtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      console.log(data);
      // You can redirect or perform other actions based on the response
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle errors if any
    });
});
