<!DOCTYPE html>
<html>
<head>
  <title>Button Sound & Counter</title>
  <style>
    /* Your CSS styles here */
  </style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ITC+Galliard+Std+Ultra&display=swap">
</head>
<body>
  <!-- Your HTML content -->
  <p id="counter"><span id="countValue">0</span>%</p>
  <img id="foxButton" src="fox.png" onclick="handleButtonClick()" alt="Fox Image">
  <audio id="audio"></audio>
  <script>
    let counter = 0;
    const sounds = [];
    
    // Generate sound file paths
    for (let i = 1; i <= 50; i++) {
      sounds.push(`/sound/sound(${i}).mp3`);
    }
    
    // Retrieve the counter value from localStorage (if it exists)
    const storedCounter = localStorage.getItem('counter');
    if (storedCounter !== null) {
      counter = parseInt(storedCounter);
      document.getElementById('countValue').textContent = counter;
    }
    
    function handleButtonClick() {
      counter++;
      document.getElementById('countValue').textContent = counter;
    
      const audioElement = document.getElementById('audio');
      const randomIndex = Math.floor(Math.random() * sounds.length);
      const randomSound = sounds[randomIndex];
    
      audioElement.src = randomSound;
      audioElement.play();
    
      // Save the updated counter value to localStorage
      localStorage.setItem('counter', counter);
    
      // Establish WebSocket connection
      const ws = new WebSocket('ws://localhost:3000'); // Replace with your server address
    
      ws.addEventListener('open', () => {
        console.log('Connected to WebSocket server');
        // Send the counter value to the server
        ws.send(counter.toString());
      });
    
      ws.addEventListener('message', (event) => {
        // Handle messages received from the server
        console.log('Received message from server:', event.data);
        // You can update UI or perform actions based on server messages if needed
      });
    }
  </script>
</body>
</html>
