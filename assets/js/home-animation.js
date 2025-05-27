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

const track = document.querySelector(".slider-track");
const dots = document.querySelectorAll(".dot");
const originalSlides = document.querySelectorAll(".slide");
let slidesPerView = getSlidesPerView();
let currentIndex = 0;
let slides = [];

// Clone first and last slides
function cloneSlides() {
  const firstClones = [];
  const lastClones = [];

  for (let i = 0; i < slidesPerView; i++) {
    const first = originalSlides[i].cloneNode(true);
    const last = originalSlides[originalSlides.length - 1 - i].cloneNode(true);

    first.classList.add("clone");
    last.classList.add("clone");

    firstClones.push(first);
    lastClones.unshift(last); // keep in order
  }

  firstClones.forEach((clone) => track.appendChild(clone));
  lastClones.forEach((clone) => track.insertBefore(clone, track.firstChild));

  slides = track.querySelectorAll(".slide");
}

cloneSlides();

// Recalculate slide width
function getSlidesPerView() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 850) return 3;
  return 4;
}

function updateSlidesPerView() {
  slidesPerView = getSlidesPerView();
}

function moveToSlide(index, transition = true) {
  const slideWidth = slides[0].offsetWidth + 20; // includes padding
  const offset = (index + slidesPerView) * slideWidth;

  if (!transition) {
    track.style.transition = "none";
  } else {
    track.style.transition = "transform 0.5s ease";
  }

  track.style.transform = `translateX(-${offset}px)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  const visibleIndex = index % dots.length;
  if (dots[visibleIndex]) {
    dots[visibleIndex].classList.add("active");
  }

  currentIndex = index;
}

// Loop transition fix
track.addEventListener("transitionend", () => {
  if (currentIndex < 0) {
    currentIndex = dots.length - 1;
    moveToSlide(currentIndex, false);
  } else if (currentIndex >= dots.length) {
    currentIndex = 0;
    moveToSlide(currentIndex, false);
  }
});

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    moveToSlide(index);
  });
});

// Swipe on mobile
let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      moveToSlide(currentIndex + 1);
    } else {
      moveToSlide(currentIndex - 1);
    }
    isDragging = false;
  }
});

// On resize
window.addEventListener("resize", () => {
  updateSlidesPerView();
  moveToSlide(currentIndex, false);
});

// Init move
moveToSlide(0, false);
