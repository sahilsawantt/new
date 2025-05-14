// const canvas = document.getElementById('game-canvas');
// const ctx = canvas.getContext('2d');

// // पात्र की स्थिति और गति
// let playerX = 375;
// let playerY = 550;
// let playerSpeed = 5;

// // एलियन की स्थिति और गति
// let alienX = Math.random() * 750;
// let alienY = 0;
// let alienSpeed = 2;

// // स्कोर
// let score = 0;
// // गेम लूप
// function gameLoop() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // पात्र को ड्रॉ करें
//   ctx.fillStyle = '#000';
//   ctx.fillRect(playerX, playerY, 50, 50);

//   // एलियन को ड्रॉ करें
//   ctx.fillStyle = '#f00';
//   ctx.fillRect(alienX, alienY, 50, 50);

//   // एलियन की गति को अपडेट करें
//   alienY += alienSpeed;

//   // स्कोर को अपडेट करें
//   score++;

//   // टकराव की जांच करें
//   if (alienY > playerY && alienY < playerY + 50 && alienX > playerX && alienX < playerX + 50) {
//     alert('गेम ओवर!');
//     score = 0;
//   }

//   // एलियन को रीसेट करें
//   if (alienY > canvas.height) {
//     alienX = Math.random() * 750;
//     alienY = 0;
//   }

//   // स्कोर को प्रदर्शित करें
//   ctx.font = '24px Arial';
//   ctx.fillStyle = '#000';
//   ctx.fillText(`स्कोर: ${score}`, 10, 30);

//   requestAnimationFrame(gameLoop);
// }

// gameLoop();

// // कीबोर्ड इवेंट को हैंडल करें
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'ArrowLeft') {
//     playerX -= playerSpeed;
//   } else if (e.key === 'ArrowRight') {
//     playerX += playerSpeed;
//   }
// });