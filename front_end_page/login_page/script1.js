const container = document.getElementById('container');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');
overlayBtn.addEventListener('click',()=>{
    container.classList.toggle('right-pannel-active');

    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame(()=>{
        overlayBtn.classList.add('btnScaled');
    })
});


//logic for login user
// document.getElementById("loginForm").addEventListener("submit", function (event) {
//   event.preventDefault(); // prevent page reload

//   const username = document.getElementById("username").value.trim();

//   if (username) {
//     // Save username in localStorage
//     localStorage.setItem("loggedInUser", username);

//     // Redirect back to main page
//     window.location.href = "../index.html";
//   } else {
//     alert("Please enter your name.");
//   }
// });
document.getElementById("create_user").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get values from form
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const password = passwordInputs[0].value.trim();
  const confirmPassword = passwordInputs[1].value.trim();

  // Basic validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send data to FastAPI backend
  try {
    const response = await fetch("http://127.0.0.1:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: username,
        user_email: email,
        user_phone: phone,
        user_password: password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.detail || "Failed to register");
      return;
    }

    const data = await response.json();
    alert("Registration successful! Please login now.");
    window.location.href = "index1.html"; // Redirect to login page

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Try again later.");
  }
});

// ================= LOGIN USER =================
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login_email").value.trim();
  const password = document.getElementById("login_password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    // const response = await fetch("http://127.0.0.1:8000/login", {
    // // const response = await fetch("http://127.0.0.1:8000/user/show", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     user_email: email,
    //     user_password: password
    //   })
    // });
    const response = await fetch("http://127.0.0.1:8000/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:new URLSearchParams({
        username: email,
        password: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Invalid email or password");
      return;
    }

    // Optional: store user/token
    // localStorage.setItem("user", JSON.stringify(data));

     // Store JWT token

    localStorage.setItem(
      "access_token",
      data.access_token
    );


    localStorage.setItem(
      "token_type",
      data.token_type
    );

    const userResponse = await fetch("http://127.0.0.1:8000/me",{
        method:"GET",
        headers:{
          "Authorization":
          `Bearer ${data.access_token}`
        }
      }
    );

    const userData = await userResponse.json(); 

    console.log("ME DATA:", userData);

    if(userResponse.ok){
      // Store user information
      localStorage.setItem("user", JSON.stringify(userData));
    }
    else{
      alert(
        userData.detail || "User data not found");
      return;
    }

    alert("Login successful!");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 5000);
    // window.location.href = "../index.html"; // redirect after login

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error. Try again later.");
  }
});
