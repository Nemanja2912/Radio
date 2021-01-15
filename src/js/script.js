document.querySelector("body").style.height = `${window.innerHeight}px`;

// HTML Element
const elSongBox = document.querySelector("#box-list");
const elAudio = document.querySelector("#audio");
const elAudioSource = document.querySelector("#source-audio");
const elPlay = document.querySelector("#play-button");
const elCurrentTime = document.querySelector("#current-time");
const elDuration = document.querySelector("#duration");
const elSongName = document.querySelector("#song-name");
const elSongArtist = document.querySelector("#song-artist");
const elSongImage = document.querySelector("#song-image");
const elVolumeButton = document.querySelector("#volume-button");
const elVolumeSlider = document.querySelector("#volume-slider");
const elVolumeRange = document.querySelector("#volume-range");
let isPlayActive = false;

// Event on play

elAudio.addEventListener("play", function () {
  isPlayActive = true;
  elPlay.className = "fas fa-pause";
});

// Event on pause

elAudio.addEventListener("pause", function () {
  isPlayActive = false;
  elPlay.className = "fas fa-play";
});

// Set song

function setSong() {
  elAudioSource.src = `assests/fakeAPI/${songPlaylist[0].song}`;

  elAudio.load();

  elAudio.play();

  elSongName.innerHTML = songPlaylist[0].name;
  elSongArtist.innerHTML = songPlaylist[0].artist;
  elSongImage.src = `assests/fakeAPI/${songPlaylist[0].image}`;
}

// List song

function printSong() {
  songPlaylist.map(
    (songItem, index) =>
      (elSongBox.innerHTML += `
      <div class="song-box ${index === 0 ? "active" : ""}">
        <div class="left">
          <div class="circle">
            <i class="fas fa-play"></i>
          </div>
          <div class="info">
            <div class="wrapper">
              <div class="name">
                ${songItem.name}
                <p class="another">${songItem.name}</p>
              </div>
            </div>
            <p class="artist">${songItem.artist}</p>
          </div>
        </div>
        <div class="right">
          <p class="time">${songItem.time}</p>
        </div>

         ${
           index === 0
             ? `<div id="duration-bar1" class="duration-bar"></div>`
             : ""
         }
      </div>
      `)
  );

  songPlaylist.shift();
}

// Fake API
let songPlaylist = [];

fetch("assests/fakeAPI/fakeAPI.json")
  .then((respons) => respons.json())
  .then((data) => {
    songPlaylist = [...data.songList];

    setSong();

    elAudio.volume = elVolumeRange.value / 100;

    printSong();

    elAudio.addEventListener("ended", function () {
      setSong();

      elSongBox.innerHTML = "";

      printSong();
    });
  });

elPlay.addEventListener("click", function () {
  if (!isPlayActive) {
    elAudio.play();
  } else {
    elAudio.pause();
  }

  isPlayActive = !isPlayActive;
});

elAudio.addEventListener("timeupdate", function () {
  document.querySelector("#duration-bar1").style.width = `${
    (elAudio.currentTime * 100) / elAudio.duration
  }%`;

  document.querySelector("#duration-bar2").style.width = `${
    (elAudio.currentTime * 100) / elAudio.duration
  }%`;

  let firstCurrentNum = Math.floor(elAudio.currentTime / 60);

  firstCurrentNum =
    firstCurrentNum < 10 ? "0" + firstCurrentNum : firstCurrentNum;

  let lastCurrentNum = Math.round(elAudio.currentTime - 60 * firstCurrentNum);

  lastCurrentNum = lastCurrentNum < 10 ? "0" + lastCurrentNum : lastCurrentNum;

  elCurrentTime.innerHTML = firstCurrentNum + ":" + lastCurrentNum;

  // Duration

  let firstDurationNum = Math.floor(elAudio.duration / 60);

  firstDurationNum =
    firstDurationNum < 10 ? "0" + firstDurationNum : firstDurationNum;

  let lastDurationNum = Math.round(elAudio.duration - 60 * firstDurationNum);

  lastDurationNum =
    lastDurationNum < 10 ? "0" + lastDurationNum : lastDurationNum;

  elDuration.innerHTML = firstDurationNum + ":" + lastDurationNum;
});

elVolumeButton.addEventListener("click", function () {
  elVolumeSlider.classList.toggle("active");
});

elVolumeRange.addEventListener("input", function () {
  elAudio.volume = elVolumeRange.value / 100;
});
