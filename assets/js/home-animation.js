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
