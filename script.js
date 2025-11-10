const imageInput = document.getElementById('imageInput');
const output = document.getElementById('output');
const detectBtn = document.getElementById('detectBtn');

// Simulated lightweight ML model
async function fakePestDetection(imgTensor) {
  // Pretend inference delay
  await new Promise(r => setTimeout(r, 1500));

  // Simple random result (simulate ML detection)
  const detected = Math.random() > 0.4; // 60% chance of pest
  return detected ? "Pest detected 🐛" : "No pest found 🌿";
}

detectBtn.addEventListener('click', async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please upload an image first!");
    return;
  }

  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  output.innerHTML = "";
  output.appendChild(img);

  const imgTensor = tf.browser.fromPixels(await new Promise(r => {
    img.onload = () => r(img);
  }));

  output.innerHTML += "<p>Analyzing image...</p>";

  const result = await fakePestDetection(imgTensor);
  output.innerHTML += `<h3>${result}</h3>`;
});