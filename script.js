function validateContactForm() {
  const form = document.getElementById("contactForm");
  const fields = form.querySelectorAll('[name="contactField"]');
  const feedback = document.getElementById("feedback");
  const emailInput = form.querySelector('input[type="email"]');
  const scriptURL = "https://script.google.com/macros/s/AKfycbz4tfGgBtNOJXGBmtlmy0erWK-rXFSonXdEgx2zWGAVvexfqUkbR4BbSxuIYGRv09bi/exec";
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const submitBtn = form.querySelector("button[type='submit']");

  let allFilled = true;
  feedback.innerText = "";
  feedback.style.color = "";
  feedback.style.textShadow = "";

  fields.forEach(field => field.classList.remove("error"));

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

  let emailValid = false;
  let emailValue = emailInput.value;

  while (!emailValid) {
    if (!emailRegex.test(emailValue)) {
      emailValue = prompt("Invalid email format. Please re-enter your email:");
      if (!emailValue || emailValue.trim() === "") {
        feedback.style.color = '#ff3b3b';
        feedback.innerText = "Email input cancelled.";
        return;
      }
    } else {
      emailValid = true;
    }
  }

  emailInput.value = emailValue;

  const formData = new FormData();
  formData.append("name", fields[0].value.trim());
  formData.append("email", emailValue.trim());
  formData.append("message", fields[2].value.trim());

  feedback.innerText = "Sending...";
  feedback.style.color = "#000";
  submitBtn.disabled = true;

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
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
}

// Floating Stars
function createFloatingStar() {
  const star = document.createElement("span");
  star.classList.add("floater");
  star.innerText = "★";
  star.style.setProperty("--x", Math.random().toFixed(2));
  star.style.fontSize = Math.random() * 1.5 + 1 + "rem";
  document.querySelector(".float-container").appendChild(star);
  setTimeout(() => star.remove(), 12000);
}
setInterval(createFloatingStar, 500);

document.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-up');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
});

// Background
document.addEventListener("DOMContentLoaded", () => {
  const bgBtn = document.getElementById("bgToggleBtn");
  const body = document.body;

  const bg1 = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng0MHlramI2bmkyNDQ1MWlpbTdpNXh4MWsyNDdycTRmOHJyaGhpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kK7qOFLoDeQGpIISJ1/giphy.gif";
  const bg2 = "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c293Z3k3eTFyem16YTU5NnNuN2l2NnZpYTI1bG4xcXQzYmNsa2R5ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZTn98KPTsHxTmfAtTj/giphy.gif";

  let isAlt = false;

  if (bgBtn) {
    bgBtn.addEventListener("click", () => {
      isAlt = !isAlt;
      body.style.backgroundImage = `url('${isAlt ? bg2 : bg1}')`;
    });
  }
});