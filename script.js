const vars = {
  forwardRight: document.querySelector('#forwardRight'),
  backwardLeft: document.querySelector('#backwardLeft'),
  slides: document.querySelector('#slides'),
};

let slideX = 0;
let slideLength;

async function getProfiles() {
  const res = await fetch('https://randomuser.me/api/?results=10');

  const data = await res.json();
  return data;
}

function events() {
  vars.forwardRight.addEventListener('click', forwardSlide);
  vars.backwardLeft.addEventListener('click', backwardSlide);
  document.addEventListener('DOMContentLoaded', loadProfiles);
}

function loadProfiles() {
  getProfiles().then((profiles) => {
    profiles.results.forEach((profile) => {
      const slide = document.createElement('div');

      slide.className = 'slide';
      slide.innerHTML = `
      <div id="slideImageContainer">
                <img
                  src="${profile.picture.large}"
                  alt=""
                />
              </div>
              <h4>Name: ${profile.name.title}. ${profile.name.first} ${profile.name.last}</h4>
              <p>Email: ${profile.email}</p>
              <p>Country: ${profile.location.country}</p>
      `;

      vars.slides.appendChild(slide);
    });
    slideLength = profiles.results.length * 390 - 1170;
  });
}

function forwardSlide() {
  if (slideX !== slideLength) {
    slideX += 390;
    const slides = Array.from(vars.slides.children);
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${slideX}px)`;
    });
  }
}

function backwardSlide() {
  if (slideX !== 0) {
    slideX -= 390;
    const slides = Array.from(vars.slides.children);
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${slideX}px)`;
    });
  }
}

events();
