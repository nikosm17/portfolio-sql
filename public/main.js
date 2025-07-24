const textBtn = document.getElementById("text");
const logForm = document.getElementById("login-form");
const pass = document.getElementById("password");
const button = document.getElementById("btn");
const popup = document.getElementById("popup");
const signupForm = document.getElementById("signup-form");
const email = document.getElementById('signupName')
const password = document.getElementById("signupPassword");
const conPassword = document.getElementById("confirmPassword");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const signupBtn = document.getElementById("signup-btn");

let failedTries = 0;

// Fade-in Login button
window.addEventListener("load", () => {
  if (textBtn) {
    setTimeout(() => {
      textBtn.classList.add("fade-in");
    }, 500);
  }
});

// Scroll animation
window.addEventListener("scroll", () => {
  if (!textBtn || textBtn.classList.contains("clicked")) return;
  const value = window.scrollY;
  textBtn.style.marginBottom = `${value * 0.5}px`;
});

// Show login form on click
textBtn.addEventListener("click", () => {
  textBtn.style.pointerEvents = "none";
  textBtn.style.visibility = "hidden";

  logForm.style.visibility = "visible";
  logForm.style.pointerEvents = "auto";
});

// Handle login form
logForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username1 = document.querySelector("input[name='email']").value;
  const password1 = pass.value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userinput: username1, passinput: password1 })
  });

  const result = await response.json();

  if (result.success) {
    timer("nextpage.html");
  } else {
    failedTries++;
    button.innerHTML = `Failed tries: ${failedTries}`;
    if (failedTries >= 3) {
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
        failedTries = 0;
        button.innerHTML = 'Submit';
      }, 30000);
    }
  }
});

function timer(url) {
  let i = 0;
  const tt = setInterval(() => {
    i++;
    const counter = 3 - i;
    button.innerHTML = 'You Will Be Redirected After: ' + counter;
    if (counter === 0) {
      clearInterval(tt);
      window.location.href = url;
    }
  }, 1000);
};

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (password.value !== conPassword.value) {
    pass2.innerHTML = "Passwords should match!";
    pass1.style.color = "red"; 
    pass2.style.color = "red";
    return;
  } else{
    pass1.innerHTML = "Password";
    pass2.innerHTML = "Confirm Password";
    pass1.style.color = "black";
    pass2.style.color = "black";
  }

  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });

  const result = await response.json();

  if (result.success) {
    signupBtn.innerHTML = "Successful Registration";
    signupBtn.style.backgroundColor = "green";
    setTimeout(() => {
      closePopup();
    }, 3000);

    setTimeout(() => {
    signupBtn.innerHTML = "Register";
    signupBtn.style.backgroundColor = "";
    email.value = "";
    password.value = "";
    conPassword.value = "";
  }, 3000);

  } else {
    signupBtn.innerHTML= "User already exists";
    signupBtn.style.backgroundColor = "red";
  }
});


function openPopup(){
  popup.classList.add("open-popup");
  logForm.style.visibility = "hidden";
}

function closePopup(){
  popup.classList.remove("open-popup");
  logForm.style.visibility = "visible";
}