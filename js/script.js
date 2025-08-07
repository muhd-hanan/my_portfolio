
  let rippleIntervalActive = true; // Control flag
const y = Math.random() * document.body.scrollHeight;
  function createRipple(x, y, fixed = false) {
    const ripple = document.createElement("div");

    // Adjust size based on screen width
    let baseSize;
    if (window.innerWidth < 640) {
      baseSize = 40; // Small for mobile
    } else if (window.innerWidth < 1024) {
      baseSize = 70; // Medium for tablet
    } else {
      baseSize = 100; // Large for desktop
    }

    ripple.classList.add("ripple");
    ripple.style.width = `${baseSize}px`;
    ripple.style.height = `${baseSize}px`;
    ripple.style.left = `${x - baseSize / 2}px`;
    ripple.style.top = `${y - baseSize / 2}px`;

    const blueShades = [
      "rgba(0, 123, 255, 0.5)",
      "rgba(0, 174, 255, 0.5)",
      "rgba(0, 102, 204, 0.5)"
    ];
    ripple.style.borderColor = blueShades[Math.floor(Math.random() * blueShades.length)];

    document.getElementById("ripple-container").appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  // Generate random positions (responsive)
  function getRandomRipplePositions(count) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * window.innerWidth * 0.95;
      const y = Math.random() * window.innerHeight * 0.85;
      positions.push({ x, y });
    }
    return positions;
  }

  // Show ripples 2 at a time in sequence
  function startRandomRipples() {
    let positions = getRandomRipplePositions(10);
    let index = 0;

    function spawnBatch() {
      if (!rippleIntervalActive) {
        setTimeout(spawnBatch, 2000);
        return; // Pause if tab not active
      }

      if (index >= positions.length) {
        index = 0;
        positions = getRandomRipplePositions(10);
      }

      for (let i = 0; i < 2 && index < positions.length; i++) {
        const pos = positions[index];
        createRipple(pos.x, pos.y, true);
        index++;
      }

      setTimeout(spawnBatch, 2000);
    }

    spawnBatch();
  }

  // Start ripple animation
  startRandomRipples();

  // Click ripple (unchanged)
  document.addEventListener("click", (e) => {
    createRipple(e.clientX, e.clientY, true);
  });

  // Clear ripples on window resize
  window.addEventListener("resize", () => {
    document.getElementById("ripple-container").innerHTML = "";
  });

  // Pause/Resume on tab visibility change
  document.addEventListener("visibilitychange", () => {
    rippleIntervalActive = !document.hidden;
  });

// ---------------------------------------------------------------------------------------------------------------------------
 const typingElement = document.getElementById("typing-text");

  // Texts to type
  const texts = [
    "Full Stack Web Developer ",
    "Django Developer  ",
    "Front End Developer  ",
    "Backend Developer  ",
    "React Developer  ",
    "Freelancer  "
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // ms per character
  let pauseTime = 2000;  // pause after word is complete

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.innerHTML = currentText.substring(0, charIndex) + '<span class="border-r-2 border-white animate-pulse"></span>';
      charIndex--;
    } else {
      typingElement.innerHTML = currentText.substring(0, charIndex) + '<span class="border-r-2 border-white animate-pulse"></span>';
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Wait before deleting
      isDeleting = true;
      setTimeout(type, pauseTime);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
  }

  type();

  // ---------------------------------------------------------

   const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");

      // Change icon
      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

// --------------------------------
const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-percent') + '%';
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('skills'));