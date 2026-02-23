import { Wheel } from '../../../dist/spin-wheel-esm.js';

window.onload = () => {
  // 1. Initial list of names (Fixed the empty comma/undefined entry)
  let actualNames = [
    'The Backward Wall Clock', 'The Smart Door That Roasts You', 'Rent-A-Personality', 
    'The Dramatic Exit Button', 'Alarm Clock That Only Stops When You Dance', 
    'The 24-Hour Self-Deleting Notebook', 'The Bag That Gets Heavier with Guilt', 
    'Silence (Bottled as a Luxury Product)', 'The "Surprise Temperature" Thermos', 
    'The "Meeting-Ender" Fake Sneeze Spray', 'A Mirror That Only Shows Your "Best Version"', 
    'The "Small Talk" Translator', 'The Literal "Easy Button"', 
    'The "Fake Friend" Phone Call Generator', 'The "Yesterday\'s News" Daily Newspaper'
  ];

  const container = document.querySelector('.wheel-wrapper'); // [cite: 18]

  const props = {
    // 2. Hide labels by using an empty string [cite: 201, 547]
    items: actualNames.map(() => ({ label: 'Unknown' })), 
    
    // 3. Callback when the wheel stops [cite: 114, 864]
    onRest: (event) => {
      const winnerIndex = event.currentIndex; // [cite: 152]
      const winnerName = actualNames[winnerIndex];
      
      alert("The selected name is: " + winnerName);

      // 4. Remove the selected name from our data array
      actualNames.splice(winnerIndex, 1);

      // 5. Update the wheel segments to reflect the remaining names 
      // This will automatically re-calculate the segment sizes [cite: 210, 850]
      window.wheel.items = actualNames.map(() => ({ label: 'Unknown' }));

      // Optional: Check if the wheel is now empty
      if (actualNames.length === 0) {
        alert("All options have been used!");
      }
    },
    
    // 15 Muted/Pastel colors [cite: 74, 812]
    itemBackgroundColors: [
      '#FAD2E1', '#E2ECE9', '#BEE1E6', '#F0EFEB', '#DFE7FD', 
      '#CDDAFD', '#BEE1E6', '#E2ECE9', '#FDE2E4', '#FFF1E6',
      '#F0EFEB', '#D6E2E9', '#BCD4E6', '#99C1DE', '#D0D1FF'
    ],
    lineWidth: 0, // Removes lines between segments for a cleaner look [cite: 108, 856]
    radius: 0.9, // Adds professional padding within the container [cite: 128, 883]
  };

  window.wheel = new Wheel(container, props); // [cite: 38]

  // Click to spin [cite: 46]
  document.addEventListener('click', () => {
    // Check rotationSpeed to prevent spinning while already in motion [cite: 138, 894]
    if (window.wheel.rotationSpeed === 0 && actualNames.length > 0) {
       window.wheel.spin(Math.random() * 500 + 200); // [cite: 46, 736]
    }
  });
};