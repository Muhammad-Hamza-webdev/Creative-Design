// move top ===================================================================================================
const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  if (scrollPercent > 10) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// Optional: scroll to top when clicked
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// marquee ====================================================================================================

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
  const tl = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: "none",
    },
  });

  // Animate movement
  tl.to(marquee, {
    x: -totalWidth,
    duration: cards.length * 3, // 5 seconds per card
    modifiers: {
      x: function (x) {
        // Loop the position when it reaches totalWidth
        return (parseFloat(x) % totalWidth) + "px";
      },
    },
  });

  // Slow down on hover instead of pausing
  let normalSpeed = cards.length * 3; // Normal duration
  let slowSpeed = cards.length * 10; // Slower duration (double the time)

  marquee.addEventListener("mouseenter", () => {
    gsap.to(tl, {
      timeScale: 0.5, // Slow down to half speed
      duration: 0.5,
      overwrite: true,
    });
  });

  marquee.addEventListener("mouseleave", () => {
    gsap.to(tl, {
      timeScale: 1, // Return to normal speed
      duration: 0.5,
      overwrite: true,
    });
  });

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
  const container = document.querySelector(".slider-container");
  const sliderTrack = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".slide-card");

  // Make the container width 100% to prevent horizontal scroll
  container.style.overflow = "hidden";

  // Clone each card and append to create seamless looping
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    sliderTrack.appendChild(clone);
  });

  // Calculate total width including gaps
  const cardWidth = cards[0].offsetWidth;
  const gapWidth = 20; // Your gap size from CSS
  const totalWidth = (cardWidth + gapWidth) * cards.length;

  // Set initial position
  gsap.set(sliderTrack, { x: 0 });

  // Animation timeline
  const tl = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: "none",
    },
  });

  // Animate movement
  tl.to(sliderTrack, {
    x: -totalWidth,
    duration: cards.length * 3, // 3 seconds per card
    modifiers: {
      x: function (x) {
        // Loop the position when it reaches totalWidth
        return (parseFloat(x) % totalWidth) + "px";
      },
    },
  });

  // More dramatic slow down on hover
  sliderTrack.addEventListener("mouseenter", () => {
    gsap.to(tl, {
      timeScale: 0.2, // Much slower speed (20% of normal)
      duration: 1, // Longer transition to slow speed
      overwrite: true,
      ease: "power2.out", // Smoother transition
    });
  });

  sliderTrack.addEventListener("mouseleave", () => {
    gsap.to(tl, {
      timeScale: 1, // Return to normal speed
      duration: 1, // Longer transition back
      overwrite: true,
      ease: "power2.out", // Smoother transition
    });
  });

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
