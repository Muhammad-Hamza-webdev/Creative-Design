document.addEventListener("DOMContentLoaded", function () {
  const marquee = document.querySelector(".marquee");
  const images = document.querySelectorAll(".marquee img");
  const container = document.querySelector(".marquee-container");

  // Clone all images for seamless looping
  const cloneGroup = marquee.cloneNode(true);
  marquee.appendChild(cloneGroup);

  // Calculate total width of original images
  let totalWidth = 0;
  images.forEach((img) => {
    totalWidth += img.offsetWidth;
  });

  // Set animation duration based on width and desired speed
  const pixelsPerSecond = 50; // Adjust this for speed control
  const duration = totalWidth / pixelsPerSecond;

  // Create the animation
  const tl = gsap.timeline({ repeat: -1 });

  // Animate the marquee
  tl.to(marquee, {
    x: -totalWidth,
    duration: duration,
    ease: "none",
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initMarquee, 100);
  });

  function initMarquee() {
    // Recalculate width on resize
    totalWidth = 0;
    images.forEach((img) => {
      totalWidth += img.offsetWidth;
    });

    // Reset position and restart animation
    gsap.set(marquee, { x: 0 });
    tl.restart();
  }
});

// 2nd marquee code ==================================================================

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".everything-you-need");
  const marquee = document.querySelector(".img-marquee-container");
  const cards = document.querySelectorAll(".img-card");

  // Make the container width 100% to prevent horizontal scroll
  container.style.overflow = "hidden";

  // Clone each card and append to create seamless looping
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    marquee.appendChild(clone);
  });

  // Calculate total width including gaps
  const cardWidth = cards[0].offsetWidth;
  const gapWidth = 20; // Your gap size
  const totalWidth = (cardWidth + gapWidth) * cards.length;

  // Set initial position
  gsap.set(marquee, { x: 0 });

  // Animation timeline
  const tl = gsap.timeline({ repeat: -1 });

  // Animate movement
  tl.to(marquee, {
    x: -totalWidth,
    duration: cards.length * 5, // 5 seconds per card
    ease: "none",
    modifiers: {
      x: function (x) {
        // Loop the position when it reaches totalWidth
        return (parseFloat(x) % totalWidth) + "px";
      },
    },
  });

  // Pause on hover
  marquee.addEventListener("mouseenter", () => tl.pause());
  marquee.addEventListener("mouseleave", () => tl.play());

  // Handle resize
  window.addEventListener("resize", function () {
    const newCardWidth = cards[0].offsetWidth;
    const newTotalWidth = (newCardWidth + gapWidth) * cards.length;

    // Update animation with new widths
    tl.progress(0).vars.modifiers.x = function (x) {
      return (parseFloat(x) % newTotalWidth) + "px";
    };
    tl.vars.x = -newTotalWidth;
    tl.invalidate().restart();
  });
});

// toggle code ================================================================================
const boxes = document.querySelectorAll(".box");
const images = document.querySelectorAll(".desktop-imges .img");

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // Remove active from all
    boxes.forEach((b) => b.classList.remove("active"));
    images.forEach((img) => img.classList.remove("active"));

    // Add active to current
    box.classList.add("active");
    images[index].classList.add("active");
  });
});

// slider ==========================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const slideCount = slides.length;
  let currentIndex = 0;
  const visibleSlides = 4; // Number of slides to show at once

  // Clone slides for infinite loop
  const firstSlide = slides[0].cloneNode(true);
  const secondSlide = slides[1].cloneNode(true);
  const thirdSlide = slides[2].cloneNode(true);
  const lastSlide = slides[slideCount - 1].cloneNode(true);
  const secondLastSlide = slides[slideCount - 2].cloneNode(true);
  const thirdLastSlide = slides[slideCount - 3].cloneNode(true);

  sliderTrack.appendChild(firstSlide);
  sliderTrack.appendChild(secondSlide);
  sliderTrack.appendChild(thirdSlide);
  sliderTrack.insertBefore(lastSlide, slides[0]);
  sliderTrack.insertBefore(secondLastSlide, slides[0]);
  sliderTrack.insertBefore(thirdLastSlide, slides[0]);

  // Update slides reference after cloning
  const allSlides = document.querySelectorAll(".slide");
  const totalSlides = allSlides.length;
  currentIndex = 3; // Start at the first original slide (after clones)

  // Set initial position
  sliderTrack.style.transform = `translateX(-${
    currentIndex * (100 / visibleSlides)
  }%)`;

  // Auto-slide functionality
  let autoSlideInterval = setInterval(nextSlide, 3000);

  function nextSlide() {
    currentIndex++;
    sliderTrack.style.transition = "transform 0.5s ease";
    sliderTrack.style.transform = `translateX(-${
      currentIndex * (100 / visibleSlides)
    }%)`;

    // Check if we need to jump to the other end
    if (currentIndex >= totalSlides - visibleSlides) {
      setTimeout(() => {
        sliderTrack.style.transition = "none";
        currentIndex = 3; // Jump back to first original slide
        sliderTrack.style.transform = `translateX(-${
          currentIndex * (100 / visibleSlides)
        }%)`;
      }, 500);
    }

    updateDots();
  }

  function updateDots() {
    let dotIndex = currentIndex - 3; // Adjust for cloned slides
    if (dotIndex >= slideCount) dotIndex = 0;
    if (dotIndex < 0) dotIndex = slideCount - 1;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });
  }

  // Dot click event
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
      const dotIndex = parseInt(this.getAttribute("data-index"));
      currentIndex = dotIndex + 3; // Adjust for cloned slides

      sliderTrack.style.transition = "transform 0.5s ease";
      sliderTrack.style.transform = `translateX(-${
        currentIndex * (100 / visibleSlides)
      }%)`;

      updateDots();

      // Restart auto-slide
      autoSlideInterval = setInterval(nextSlide, 3000);
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    },
    { passive: true }
  );

  sliderTrack.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlideInterval = setInterval(nextSlide, 3000);
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left - next slide
      nextSlide();
    } else if (touchEndX > touchStartX) {
      // Swipe right - previous slide
      currentIndex--;
      sliderTrack.style.transition = "transform 0.5s ease";
      sliderTrack.style.transform = `translateX(-${
        currentIndex * (100 / visibleSlides)
      }%)`;

      // Check if we need to jump to the other end
      if (currentIndex <= 0) {
        setTimeout(() => {
          sliderTrack.style.transition = "none";
          currentIndex = totalSlides - visibleSlides - 3; // Jump to last original slides
          sliderTrack.style.transform = `translateX(-${
            currentIndex * (100 / visibleSlides)
          }%)`;
        }, 500);
      }

      updateDots();
    }
  }

  // Pause auto-slide on hover
  sliderTrack.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  sliderTrack.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 3000);
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${
      currentIndex * (100 / visibleSlides)
    }%)`;
  });
});
