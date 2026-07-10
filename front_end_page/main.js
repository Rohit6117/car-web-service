/*************** NAV MENU *****************/
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});


/*************** SCROLL REVEAL *****************/
const scrollRevealOptions = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__content h1", scrollRevealOptions);
ScrollReveal().reveal(".header__btn", { ...scrollRevealOptions, delay: 500 });
ScrollReveal().reveal(".service__card", {
  ...scrollRevealOptions,
  interval: 500,
});
ScrollReveal().reveal(".price__card", {
  ...scrollRevealOptions,
  interval: 500,
});


/*************** SWIPER *****************/
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});


/*************** LOGIN / LOGOUT *****************/
// const loginBtn = document.getElementById("loginBtn");
// const userData = localStorage.getItem("user");

// if (userData) {
//   const user = JSON.parse(userData);

//   // Username
//   const usernameSpan = document.createElement("span");
//   usernameSpan.textContent = user.user_name || user.user_email;
//   usernameSpan.style.color = "white";
//   usernameSpan.style.marginLeft = "10px";
//   usernameSpan.style.fontWeight = "bold";
//   usernameSpan.style.cursor = "pointer";

//   // Logout dropdown
//   const logoutDiv = document.createElement("div");
//   logoutDiv.textContent = "Logout";
//   logoutDiv.style.display = "none";
//   logoutDiv.style.position = "absolute";
//   logoutDiv.style.background = "#fff";
//   logoutDiv.style.color = "#000";
//   logoutDiv.style.padding = "6px 12px";
//   logoutDiv.style.borderRadius = "6px";
//   logoutDiv.style.cursor = "pointer";
//   logoutDiv.style.marginTop = "6px";
//   logoutDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";

//   // Wrapper
//   const wrapper = document.createElement("div");
//   wrapper.style.position = "relative";
//   wrapper.style.display = "inline-block";

//   wrapper.appendChild(usernameSpan);
//   wrapper.appendChild(logoutDiv);

//   loginBtn.replaceWith(wrapper);

//   // Toggle logout
//   usernameSpan.addEventListener("click", () => {
//     logoutDiv.style.display =
//       logoutDiv.style.display === "none" ? "block" : "none";
//   });

//   // Logout
//   logoutDiv.addEventListener("click", () => {
//     localStorage.removeItem("user");
//     window.location.href = "login_page/index1.html";
//   });

// } else {
//   // Not logged in
//   loginBtn.addEventListener("click", () => {
//     window.location.href = "login_page/index1.html";
//   });
// }

/*************** LOGIN / LOGOUT *****************/
const loginBtn = document.getElementById("loginBtn");

async function checkLogin(){
    const token = localStorage.getItem("access_token");
    // No token
    if(!token){
        showLoginButton();
        return;
    }
    
    try{
        const response = await fetch(
            "http://127.0.0.1:8000/me",
            {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const data = await response.json();
        // Token expired
        if(response.status === 401){
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
            alert("Session expired. Please login again.");
            showLoginButton();
            return;
        }
        // Token valid
        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );
        showUser(data);
    }
    catch(error){
        console.log("Session check error:",error);
        showLoginButton();
    }
}

function showUser(user){

    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = user.user_name || user.user_email;
    usernameSpan.style.color="white";
    usernameSpan.style.marginLeft="10px";
    usernameSpan.style.fontWeight="bold";
    usernameSpan.style.cursor="pointer";

    const logoutDiv=document.createElement("div");
    logoutDiv.textContent="Logout";
    logoutDiv.style.display="none";
    logoutDiv.style.position="absolute";
    logoutDiv.style.background="#fff";
    logoutDiv.style.color="#000";
    logoutDiv.style.padding="6px 12px";
    logoutDiv.style.borderRadius="6px";
    logoutDiv.style.cursor="pointer";

    const wrapper=document.createElement("div");
    wrapper.style.position="relative";
    wrapper.style.display="inline-block";
    wrapper.appendChild(usernameSpan);
    wrapper.appendChild(logoutDiv);
    loginBtn.replaceWith(wrapper);
    usernameSpan.onclick=()=>{
        logoutDiv.style.display =
        logoutDiv.style.display==="none"
        ?"block"
        :"none";
    };
    logoutDiv.onclick=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        window.location.href="login_page/index1.html";
    };
}

function showLoginButton(){
    loginBtn.style.display="block";
    loginBtn.onclick=()=>{
        window.location.href=
        "login_page/index1.html";
    };
}
// Run when page loads
checkLogin();
