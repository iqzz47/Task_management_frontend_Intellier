// login.js

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the login button
    document.getElementById("loginBtn").addEventListener("click", function () {
        // Get the values from the form fields
        var employeeID = document.getElementById("form2Example17").value;
        var password = document.getElementById("form2Example27").value;

        // Create an object with the login data
        var loginData = {
            employeeID: employeeID,
            password: password
        };

        // Make an HTTP POST request to the backend API
       
        fetch(`http://127.0.0.1:8000/token?employeeid=${employeeID}&password=${password}`)
           
        .then(response => response.json())
        .then(data => {
            // Handle the response froms the backend
            console.log(data);
            

            // Check the verification status
            if (data!=0) {
                localStorage.setItem("employeeID", employeeID);

                // Redirect or perform actions for a successful login
                console.log("Login successful!");
                window.location.href = `index.html`;
            } else {
                // Handle failed login (show error message, etc.)
                console.log("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle errors if any
        });
    });
});
