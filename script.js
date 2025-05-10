function toggleMobileMenu() {
  const mobileNav = document.getElementById('mainNav');
  mobileNav.classList.toggle('open');
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mainNav');
  mobileNav.classList.remove('open');
}

function handleNavLinkClick(linkElement) {
  const targetId = linkElement.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    closeMobileMenu();
    scrollToTarget(targetElement, 500);
  }
}

function scrollToTarget(targetElement, duration) {
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    window.scrollTo(0, startPosition + distance * progress);
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

let currentCarouselSlide = 0;
const carouselTrack = document.querySelector('.carousel-track');
const carouselDots = document.querySelectorAll('.carousel-dot');
let autoSlideInterval = setInterval(advanceCarousel, 3000);

function moveCarouselSlide(direction) {
  currentCarouselSlide += direction;
  if (currentCarouselSlide < 0) currentCarouselSlide = 2;
  if (currentCarouselSlide > 2) currentCarouselSlide = 0;
  updateCarouselDisplay();
  resetAutoSlideInterval();
}

function goToCarouselSlide(index) {
  currentCarouselSlide = index;
  updateCarouselDisplay();
  resetAutoSlideInterval();
}

function updateCarouselDisplay() {
  carouselTrack.style.transform = `translateX(-${currentCarouselSlide * 100}%)`;
  carouselDots.forEach((dot, i) => {
    dot.classList.remove('active');
    dot.setAttribute('aria-selected', i === currentCarouselSlide);
  });
  carouselDots[currentCarouselSlide].classList.add('active');
}

function resetAutoSlideInterval() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(advanceCarousel, 3000);
}

function advanceCarousel() {
  moveCarouselSlide(1);
}

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    accordionItem.classList.toggle('expanded');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

const jumpToTopButton = document.getElementById('jump-to-top');
if (jumpToTopButton) {
  jumpToTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    const topElement = document.getElementById('top');
    scrollToTarget(topElement, 200);
  });
}