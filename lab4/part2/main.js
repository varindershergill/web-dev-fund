const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const imageAltTexts = [
  'Closeup of a human eye',
  'Sandstone pattern',
  'Purple and white flowers',
  'Egyptian wall painting',
  'Butterfly on a leaf'
];

/* Looping through images */
for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imageFilenames[i]}`);
  newImage.setAttribute('alt', imageAltTexts[i]);
  thumbBar.appendChild(newImage);

  // Adding click event listener to update displayed image
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${imageFilenames[i]}`);
    displayedImage.setAttribute('alt', imageAltTexts[i]);
  });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
