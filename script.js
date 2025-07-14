function validateContactForm() {
  const form = document.getElementById("contactForm");
  const fields = form.querySelectorAll('[name="contactField"]');
  const feedback = document.getElementById("feedback");
  const emailInput = form.querySelector('input[type="email"]');
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const scriptURL = "https://script.google.com/macros/s/AKfycbz4tfGgBtNOJXGBmtlmy0erWK-rXFSonXdEgx2zWGAVvexfqUkbR4BbSxuIYGRv09bi/exec";

  let allFilled = true;

  // Reset feedback
  feedback.innerText = "";
  feedback.style.color = "";
  feedback.style.textShadow = "";
  fields.forEach(field => field.classList.remove("error"));

  // Check for empty fields
  fields.forEach(field => {
    if (field.value.trim() === "") {
      field.classList.add("error");
      allFilled = false;
    }
  });

  if (!allFilled) {
    alert("Please fill out all fields.");
    feedback.style.color = '#ff3b3b';
    feedback.style.textShadow = '0 0 5px #000';
    feedback.innerText = "Please fill out all fields.";
    return;
  }

  // Email validation using do...while
  let emailValid = false;
  let emailValue = emailInput.value;

  do {
    if (!emailRegex.test(emailValue)) {
      emailValue = prompt("Invalid email format. Please re-enter your email:");
      if (emailValue === null || emailValue.trim() === "") {
        feedback.style.color = '#ff3b3b';
        feedback.innerText = "Email input cancelled.";
        return;
      }
    } else {
      emailValid = true;
    }
  } while (!emailValid);

  emailInput.value = emailValue;

  // Prepare form data for submission
  const formData = new FormData();
  formData.append("name", fields[0].value.trim());
  formData.append("email", emailValue.trim());
  formData.append("message", fields[2].value.trim());

  feedback.innerText = "Sending...";
  feedback.style.color = "#FFA500"; 
    
  // Send to Google Apps Script
  fetch(scriptURL, {
    method: "POST",
    body: new URLSearchParams(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        feedback.style.color = '#39FF14';
        feedback.style.textShadow = '0 0 5px #000';
        feedback.innerText = "Your message has been sent!";
        alert("Form submitted successfully!");
        form.reset();
      } else {
        feedback.style.color = '#ff3b3b';
        feedback.innerText = "Submission failed. Please try again.";
        console.error(data.message || "Unknown error.");
      }
    })
    .catch(error => {
      console.error("Error!", error.message);
      feedback.style.color = '#ff3b3b';
      feedback.innerText = "Error sending message.";
    });
}

// Scroll reveal animation
document.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-up');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
});

function createFloatingStar() {
  const star = document.createElement("span");
  star.classList.add("floater");
  star.innerText = "★";
  star.style.setProperty("--x", Math.random().toFixed(2)); // Random horizontal position
  star.style.fontSize = Math.random() * 1.5 + 1 + "rem"; // Random size

  document.querySelector(".float-container").appendChild(star);

  setTimeout(() => {
    star.remove(); // Remove star after animation ends
  }, 12000); // Match animation duration
}

// Create a new star every 500ms
setInterval(createFloatingStar, 500);

// Button color toggle
document.addEventListener("DOMContentLoaded", () => {
  const colorBtn = document.getElementById("colorBtn");
  if (colorBtn) {
    colorBtn.addEventListener("click", () => {
      colorBtn.classList.toggle("clicked");
    });
  }
});