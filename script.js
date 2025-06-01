// Setup Web Speech API
const micBtn = document.getElementById("micBtn");
const output = document.getElementById("commandOutput");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

// When the mic starts listening
recognition.onstart = () => {
  output.textContent = "Listening...";
  micBtn.textContent = "🎤 Listening...";
};

// When a result is received
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase().trim();
  output.textContent = `You said: "${transcript}"`;
  micBtn.textContent = "🎤 Start Listening";

  handleCommand(transcript);
};

// Reset UI when done listening
recognition.onend = () => {
  micBtn.textContent = "🎤 Start Listening";
};

// Start listening when button is clicked
micBtn.addEventListener("click", () => {
  recognition.start();
});

// Command handler function
function handleCommand(command) {
  // Color keywords
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "gray"];
  for (let color of colors) {
    if (command.includes(color)) {
      document.body.style.backgroundColor = color;
      return;
    }
  }

  // Dark mode toggle
  if (command.includes("dark mode")) {
    document.body.classList.toggle("dark");
    return;
  }

  // Website shortcuts
  const websites = {
    github: "https://github.com",
    youtube: "https://www.youtube.com",
    google: "https://www.google.com",
    twitter: "https://twitter.com",
    linkedin: "https://www.linkedin.com"
  };

  for (let site in websites) {
    if (command.includes(site)) {
      window.open(websites[site], "_blank");
      return;
    }
  }

  // Time check
  if (command.includes("time")) {
    alert("Current Time: " + new Date().toLocaleTimeString());
    return;
  }

  // Default case
  alert("Command not recognized.");
}
