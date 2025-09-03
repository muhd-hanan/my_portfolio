
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




    // ===============================================


  
    document.addEventListener('DOMContentLoaded', () => {
      const track = document.querySelector('.slider-track');
      const slides = Array.from(track.children);
      const dotsNav = document.getElementById('pagination-dots');
      const nextButton = document.getElementById('nextBtn');
      const prevButton = document.getElementById('prevBtn');

      let currentIndex = Math.floor(slides.length / 2);
      let isDragging = false, startPos = 0;
      const dragThreshold = 50;

      // Dots
      slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('w-2.5','h-2.5','sm:w-3','sm:h-3','rounded-full',
                          'bg-gray-600','transition-colors','duration-300','hover:bg-gray-400');
        dot.addEventListener('click', () => { currentIndex = index; updateSlider(); });
        dotsNav.appendChild(dot);

        slide.addEventListener('click', (e) => {
          if (Math.abs(startPos - getPositionX(e)) < 10) {
            currentIndex = index; updateSlider();
          }
        });
      });

      const dots = Array.from(dotsNav.children);

      const getPositionX = (event) =>
        event.type.includes('touch')
          ? (event.touches[0] ? event.touches[0].clientX : event.changedTouches[0].clientX)
          : event.pageX;

      const dragStart = (event) => {
        isDragging = true;
        startPos = getPositionX(event);
        slides.forEach(slide => slide.style.transition = 'none');
      };

      const dragEnd = (event) => {
        if (!isDragging) return;
        isDragging = false;
        slides.forEach(slide => slide.style.transition = '');
        const endPos = getPositionX(event);
        const movedBy = endPos - startPos;
        if (Math.abs(movedBy) > dragThreshold) {
          movedBy < 0 ? moveToNextSlide() : moveToPrevSlide();
        } else updateSlider();
      };

      track.addEventListener('mousedown', dragStart);
      track.addEventListener('touchstart', dragStart, { passive: true });
      track.addEventListener('mouseup', dragEnd);
      track.addEventListener('mouseleave', dragEnd);
      track.addEventListener('touchend', dragEnd);

      const updateSlider = () => {
        const isMobile = window.innerWidth < 640; // mobile breakpoint
        const numSlides = slides.length;

        slides.forEach((slide, index) => {
          let offsetFromCenter = index - currentIndex;
          if (offsetFromCenter > numSlides / 2) offsetFromCenter -= numSlides;
          if (offsetFromCenter < -numSlides / 2) offsetFromCenter += numSlides;

          let scale, zIndex, translateX, translateZ, opacity, filter;
          if (isMobile) {
            zIndex = 10 - Math.abs(offsetFromCenter);
            filter = `brightness(${1 - Math.abs(offsetFromCenter) * 0.4})`;
            if (Math.abs(offsetFromCenter) > 1) {
              opacity = 0; scale = 0.7; translateX = offsetFromCenter * 60; translateZ = -400;
            } else {
              opacity = 1; scale = 1 - Math.abs(offsetFromCenter) * 0.25; translateZ = -Math.abs(offsetFromCenter) * 150;
              translateX = offsetFromCenter * 80;
            }
          } else {
            zIndex = 10 - Math.abs(offsetFromCenter);
            filter = `brightness(${1 - Math.abs(offsetFromCenter) * 0.25})`;
            if (Math.abs(offsetFromCenter) > 2) {
              opacity = 0; scale = 0.5; translateX = offsetFromCenter * 30; translateZ = -500;
            } else {
              opacity = 1; scale = 1 - Math.abs(offsetFromCenter) * 0.2; translateZ = -Math.abs(offsetFromCenter) * 150;
              translateX = offsetFromCenter * 40;
            }
          }

          slide.style.transform = `translateX(${translateX}%) scale(${scale}) translateZ(${translateZ}px)`;
          slide.style.zIndex = zIndex;
          slide.style.opacity = opacity;
          slide.style.filter = filter;
          slide.style.left = '50%';
          slide.style.marginLeft = `-${slide.offsetWidth / 2}px`;
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('bg-white', i === currentIndex);
          dot.classList.toggle('bg-gray-600', i !== currentIndex);
        });
      };

      const moveToNextSlide = () => { currentIndex = (currentIndex + 1) % slides.length; updateSlider(); };
      const moveToPrevSlide = () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlider(); };

      nextButton.addEventListener('click', moveToNextSlide);
      prevButton.addEventListener('click', moveToPrevSlide);
      window.addEventListener('resize', updateSlider);
      setTimeout(updateSlider, 100);
    });
  