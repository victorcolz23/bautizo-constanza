document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Countdown Logic
    const countdownDate = new Date("March 21, 2026 12:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<p>¡Es hoy!</p>";
        }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // RSVP WhatsApp Logic
    const rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const familyName = document.getElementById('familyName').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;

        const message = `¡Hola! Confirmamos nuestra asistencia al bautizo de Constanza.%0A%0A` +
                        `*Familia:* ${encodeURIComponent(familyName)}%0A` +
                        `*Adultos:* ${adults}%0A` +
                        `*Niños:* ${children}%0A%0A` +
                        `¡Muchas gracias!`;

        const whatsappNumber = "526146086981"; // Format: CountryCode + Number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
    });
});
