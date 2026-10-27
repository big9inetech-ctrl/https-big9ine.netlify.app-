// ========================================
// BIG9INE TECH WRLD — PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    document.addEventListener("click", function (event) {
        if (
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navigation.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

    // 2. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 3. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(
        ".section, .project-card, .service-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("revealed");
        });
    }


    // 4. CURRENT YEAR IN THE FOOTER
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 5. BACK-TO-TOP BUTTON
    const backToTop = document.querySelector(
        "#back-to-top, .back-to-top"
    );

    if (backToTop) {
        function updateBackToTop() {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 400
            );
        }

        window.addEventListener("scroll", updateBackToTop);
        updateBackToTop();

        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

     // 6. HERO TYPING ANIMATION
const typingElement = document.querySelector("#typing-text");

if (typingElement) {
    const roles = [
        "Aspiring Web Developer",
        "Frontend Developer",
        "Entrepreneur",
        "Digital Solutions Creator"
    ];

    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
            typingElement.textContent = currentRole.substring(
                0,
                characterIndex
            );

            if (characterIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
                return;
            }

            setTimeout(typeRole, 45);
        } else {
            const nextRole = roles[roleIndex];
            characterIndex++;

            typingElement.textContent = nextRole.substring(
                0,
                characterIndex
            );

            if (characterIndex >= nextRole.length) {
                deleting = true;
                setTimeout(typeRole, 1800);
                return;
            }

            setTimeout(typeRole, 75);
        }
    }

    setTimeout(typeRole, 1800);
}

// ==========================================
// 7. EMAILJS CONTACT FORM
// BIG9INE TECH WRLD PORTFOLIO
// ==========================================

// Your EmailJS details
const SERVICE_ID = "service_q155ek1";
const TEMPLATE_ID = "template_va4ee6k";
const PUBLIC_KEY = "4QV0QNEyBrLLQ1NLA";

// Get the contact form and status message
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Check that EmailJS is loaded
if (typeof emailjs !== "undefined") {

    // Handle contact form submission
    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get the user's details
            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const message = document.getElementById("contact-message").value.trim();

            // Check that all fields are filled
            if (!name || !email || !message) {

                if (formStatus) {
                    formStatus.textContent = "Please fill in all fields.";
                }

                return;
            }

            // Show sending message
            if (formStatus) {
                formStatus.textContent = "Sending your message...";
            }

            // Disable the submit button
            const submitButton = contactForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
            }

            // Send the message using EmailJS
            emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: name,
                    email: email,
                    message: message
                },
                {
                    publicKey: PUBLIC_KEY
                }
            )

            // If the message is sent successfully
            .then(function (response) {

                console.log("SUCCESS!", response.status, response.text);

                if (formStatus) {
                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";
                }

                // Clear the form
                contactForm.reset();

            })

            // If an error occurs
            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                if (formStatus) {
                    formStatus.textContent =
                        "Sorry, your message could not be sent. Please try again.";
                }

            })

            // Re-enable the submit button
            .finally(function () {

                if (submitButton) {
                    submitButton.disabled = false;
                }

            });

        });

    } else {
        console.error(
            'Contact form not found. Check that your form ID is "contact-form".'
        );
    }

} else {
    console.error(
        "EmailJS is not loaded. Check your EmailJS script in index.html."
    );
}

    console.log("BIG9INE TECH WRLD portfolio JavaScript loaded successfully.");

});

/* =====================================
   ABOUT ME TYPING ANIMATION
===================================== */

const aboutSection = document.querySelector("#about");

if (aboutSection) {
    const aboutHeading = aboutSection.querySelector(".about-reveal");
    const aboutParagraphs = aboutSection.querySelectorAll(".about-typing");

    // Save the original paragraph text.
    aboutParagraphs.forEach((paragraph) => {
        paragraph.dataset.fullText = paragraph.textContent
            .replace(/\s+/g, " ")
            .trim();

        paragraph.textContent = "";
    });

    let aboutAnimationStarted = false;

    async function typeAboutText(element, text) {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Display the full text immediately if reduced motion is preferred.
        if (reducedMotion) {
            element.textContent = text;
            return;
        }

        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];

            // Slightly faster typing for a smooth reading experience.
            await new Promise((resolve) => setTimeout(resolve, 22));
        }
    }

    async function animateAboutSection() {
        if (aboutAnimationStarted) return;

        aboutAnimationStarted = true;

        // Reveal the heading first.
        if (aboutHeading) {
            aboutHeading.classList.add("about-visible");
        }

        // Give the heading time to appear.
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Type each paragraph in sequence.
        for (const paragraph of aboutParagraphs) {
            await typeAboutText(
                paragraph,
                paragraph.dataset.fullText
            );

            await new Promise((resolve) => setTimeout(resolve, 350));
        }
    }

    // Start the animation when the About section enters the screen.
    if ("IntersectionObserver" in window) {
        const aboutObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateAboutSection();
                        aboutObserver.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        aboutObserver.observe(aboutSection);
    } else {
        // Fallback for older browsers.
        animateAboutSection();
    }
}