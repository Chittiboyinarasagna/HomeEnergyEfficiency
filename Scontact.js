document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("cLK4LZv1dSJs9Ermv"); // Replace with your EmailJS Public Key

    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form data
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        // Send email via EmailJS
        emailjs.send("service_bubo6ct", "template_xnub7qf", {
            from_name: name,
            from_email: email,
            message: message
        })
            .then(function (response) {
                document.getElementById("statusMessage").innerText = "✅ Message Sent Successfully!";
                document.getElementById("contactForm").reset();
            }, function (error) {
                document.getElementById("statusMessage").innerText = "❌ Error Sending Message. Try Again!";
            });
    });
});
