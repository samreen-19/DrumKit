let recording = false;
let recordedSequence = [];
let currentVolume = 1.0; // Default volume

document.getElementById('record').addEventListener('click', function() {
  recording = !recording;
  if (recording) {
    recordedSequence = [];
    this.textContent = 'Stop Recording';
  } else {
    this.textContent = 'Start Recording';
  }
});

document.addEventListener('keydown', function(event) {
  if (recording) {
    recordedSequence.push({ key: event.key.toLowerCase(), time: Date.now() });
  }
  makeSound(event.key.toLowerCase());
  buttonAnimation(event.key.toLowerCase());
});

document.querySelectorAll('.drum').forEach(button => {
  button.addEventListener('click', function() {
    const buttonInnerHTML = this.innerHTML.toLowerCase();
    if (recording) {
      recordedSequence.push({ key: buttonInnerHTML, time: Date.now() });
    }
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
});

document.getElementById('playback').addEventListener('click', function() {
  console.log('Playback button clicked');
  if (!recordedSequence.length) {
    console.log('No recorded sequence to play');
    return;
  }
  let startTime = recordedSequence[0].time;
  recordedSequence.forEach(note => {
    console.log(`Scheduling note: ${note.key} at ${note.time - startTime}ms`);
    setTimeout(() => {
      makeSound(note.key);
      buttonAnimation(note.key);
    }, note.time - startTime);
  });
});

const volumeControl = document.getElementById('volume');
volumeControl.addEventListener('input', function() {
  currentVolume = this.value;
  console.log(`Volume set to: ${currentVolume}`);
});

function makeSound(key) {
  let audio;
  switch (key) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      audio = new Audio('sounds/tom-3.mp3');
      break;
    case "d":
      audio = new Audio('sounds/tom-4.mp3');
      break;
    case "j":
      audio = new Audio('sounds/snare.mp3');
      break;
    case "k":
      audio = new Audio('sounds/crash.mp3');
      break;
    case "l":
      audio = new Audio('sounds/kick-bass.mp3');
      break;
    default:
      console.log(key);
      return;
  }
  audio.volume = currentVolume;
  audio.play();
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}
