document.getElementById("bt").addEventListener("click", function () {
    // Collect data from the form fields
    var t_code = document.getElementById("t_code").value;
    var taskData = {
        // Update keys to match the expected keys in your FastAPI endpoint
        
        taskname: document.getElementById("taskname").value,
        createdate: document.getElementById("inputCity").value + 'T00:00:00',
        duedate: document.getElementById("inputZip").value + 'T00:00:00',
        duration: document.getElementById("inputZip3").value,
        status:document.getElementById("inputState").value,
        assignedfrom: document.getElementById("inputEmail4").value,
        assignedto: document.getElementById("inputPassword4").value,
        
    };
   
    t_code = window.location.hash.slice(1); 

    
    console.log(t_code)


  

    

    // Make an HTTP POST request to the backend API
    fetch(`http://127.0.0.1:8000/updatetaskdetail/%23${t_code}`, {
        method: "PUT",
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
