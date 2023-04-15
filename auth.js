// Get references to the submit button and authentication form
const submitBtn = document.getElementById("submit-btn");
const authForm = document.getElementById("auth-form");

// Initialize Firebase Authentication
const auth = firebase.auth();

// Listen for clicks on the submit button
submitBtn.addEventListener("click", () => {
  // Prompt the user to sign in with email and password
  authForm.style.display = "block";
});

// Listen for form submissions
authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sign in the user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in successfully, hide the authentication form and proceed with file submission
      authForm.style.display = "none";
      submitFileForSteganography();
    })
    .catch((error) => {
      // Handle errors, e.g. display an error message
      console.error(error);
    });
});
