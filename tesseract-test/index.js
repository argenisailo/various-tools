const Tesseract = require('tesseract.js');

// Path to the local image file
const imagePath = '/Users/argenislo/Downloads/large-WhatsApp Image 2025-03-18 at 12.52.19 PM.jpeg';

Tesseract.recognize(
  imagePath,
  'eng',
  {
    logger: (m) => console.log(m),
  }
)
.then(({ data: { text } }) => {
  console.log('Recognized Text:', text);
  const numbers = text.match(/\d+/);
  if (numbers) {
    console.log('Extracted Number:', numbers[0]);
  } else {
    console.log('No numbers found.');
  }
})
.catch((error) => {
  console.error('Error:', error);
});
