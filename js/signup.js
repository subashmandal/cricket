function createAccount() {
  const name = document.getElementById('name').value;
  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;
  const name_error = document.getElementById('name_error');
  const email_error = document.getElementById("email_error");
  const pass_error = document.getElementById("pass_error");

  name_error.textContent = "";
  email_error.textContent="";
  pass_error.textContent="";

  function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const properEmail = isValidEmail(email);

 if (name === "") {
    name_error.textContent = "Please enter your name to Create account";
} else {
    document.getElementById('checkname').style.display = "block";

    if (email === "") {
        email_error.textContent = "Please enter your email";
    } else if (!properEmail) {
        email_error.textContent = "Please enter a valid email";
    } else {
        document.getElementById('checkemail').style.display = "block";

        if (password === "") {
            pass_error.textContent = "Please enter your password to Create account";
        } else {
            document.getElementById('checkpass').style.display = "block";

            // AJAX request
            $.ajax({
                url: "../ajax/user_signup.php",
                type: "POST",
                dataType: "json", // Corrected spelling of dataType
                data: {
                    name: name,
                    email: email,
                    password: password
                },
                success: function (response) {
                    name_error.textContent = "Account created successfully!";
                    if (response.status === 'success') {
                        window.location.href = response.link;
                    } else {
                        name_error.textContent = response.message;
                    }
                },
                error: function (xhr, error) {
                    console.log('Signup Error = '+xhr.responseText);
                    name_error.textContent = "Error creating account. Please try again later.";
                },
            });
        }
    }
}
}
