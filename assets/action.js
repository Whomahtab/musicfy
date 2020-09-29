const playIcon = document.querySelector('#playIcon');
const pauseIcon = document.querySelector('#pauseIcon');
const playNext = document.querySelector('.forwadIcon');
const playPrev = document.querySelector('.backwordIcon');
const music = document.querySelector('audio');
const songName = document.querySelector('.song-name');
// const artistName = document.querySelector('.artist-name');


var heartIcon = document.querySelector('.heart-icon');


	heartIcon.addEventListener('click', function () {
	heartIcon.querySelector('svg').setAttribute('fill', '#f2f76b');
	heartIcon.querySelector('svg').style.color = '#f2f76b';
})

// Prevent dragging of image



playIcon.addEventListener('click', AudPlayPause);
pauseIcon.addEventListener('click', AudPlayPause);

// Playing Next song On click
playNext.addEventListener('click', function(){
	audio = new Audio('');
	audio = new Audio('sound/Senorita.mp3');
})