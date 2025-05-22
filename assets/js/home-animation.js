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
