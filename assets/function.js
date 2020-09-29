const playIcon = document.querySelector('#playIcon');
const pauseIcon = document.querySelector('#pauseIcon');
const playNext = document.querySelector('.forwadIcon');
const playPrev = document.querySelector('.backwordIcon');
const music = document.querySelector('audio');
const songTitle = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
var   heartIcon = document.querySelector('.heart-icon');
let currentTimeAud = document.querySelector('.audCurrent-time');
const totalTime = document.querySelector('.audTotal-time');
let progressbar = document.querySelector('.durationCurrent-timeline');
const  durationTimeline = document.querySelector('.duration-timeline');
const downIcon = document.querySelector('.arrowdownIcon');

// song's array
var songs = [{
	name : 'Attention',
	artist : 'Charli Puth'
},
{
	name : 'Senorita',
	artist : 'Unknown'
}
];


// sound/Attention.mp3
// sound/Senorita.mp3

var isPlaying = false;
var songIndex = 0;

function AudPlayPause () {
	if (music.paused) {
		music.play();
		playIcon.style.display = 'none';
		pauseIcon.style.display = 'block';
		pauseIcon.style.color= '#f2f76b';
		isPlaying = true;
	} else {
		music.pause();
		pauseIcon.style.display = 'none';
		playIcon.style.display = 'block';
		isPlaying = false;
	}

}




// Calling Play & pause func.
playIcon.addEventListener('click', AudPlayPause);
pauseIcon.addEventListener('click', AudPlayPause);


const loadSong =  (songs) =>{
	let displaysongName = songs.name;
	let displayArtist = songs.artist;
	songTitle.innerHTML = `${displaysongName + '<p class="pt-3 artist-name">'+displayArtist+'</p>'}`;
	music.src = `${'sound/' + songs.name}.mp3`;

}

loadSong(songs[0]);

// Play Next SOngggggg
function nextSong () {
	 songIndex = (songIndex +1) % songs.length;
	 loadSong(songs[songIndex]);
	 music.play();
}

function playpreviousSong () {
	songIndex = (songIndex - 1 + songs.length) % songs.length;
	 loadSong(songs[songIndex]);
	 music.play();
}

playNext.addEventListener('click', nextSong);
playPrev.addEventListener('click', playpreviousSong);


// musicProgressBar
music.addEventListener('timeupdate', function (event) {
	const {currentTime,duration} = event.srcElement;
	let progressTime = (currentTime / duration) * 100;
	// console.log(progressTime)
	progressbar.style.width = `${progressTime}%`;

	// UpdatMusic-Duration 

	let min_duration = Math.floor(duration/60);
	let sec_duration = Math.floor(duration % 60);
	let tot_dur = `${min_duration}:${sec_duration}`;
	if (duration) {
	totalTime.textContent= `${tot_dur}`;	
	}

	// CurrentMusic-Duration

	let min_crntTime = Math.floor(currentTime / 60);
	let sec_crntTime = Math.floor(currentTime % 60);
	if (sec_crntTime < 10) {
		sec_crntTime = `0${sec_crntTime}`;
	}
	let tot_currentTime = `${min_crntTime}:${sec_crntTime}`;
	currentTimeAud.textContent = `${tot_currentTime}`;

})



durationTimeline.addEventListener('click', function  (event) {
	const {duration} = music;
	// console.log(event)
	let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
	// console.log(move_progress)
	music.currentTime = move_progress;
})


// enable Loop
music.addEventListener('ended', nextSong);


// Like____Dislike___function
	heartIcon.addEventListener('click', function () {
	heartIcon.querySelector('svg').setAttribute('fill', '#f2f76b');
	heartIcon.querySelector('svg').style.color = '#f2f76b';

});



downIcon.addEventListener('click', function () {
	// let albumArt = document.querySelector('.player-album-art');
	// let plyrWrap = document.querySelector('.player-wrapper');
	// let durationWrap = document.querySelector('.duration-wrapper');
	// let songIno = document.querySelector('.song-info');

	
	
	// albumArt.classList.add('hide');
	// durationWrap.classList.add('hide');
	// songIno.classList.add('hide');
	downIcon.classList.add('arrowdownIconactive');
	// plyrWrap.style.height = '35%';
})


function callMediaSession () {
	// body... 
}


if ('mediaSession' in navigator) {

  navigator.mediaSession.metadata = new MediaMetadata({
    title: songs[songIndex].name,
    artist: songs[songIndex].artist,


    artwork: [
      { src: 'https://source.unsplash.com/96x96/?nature,water',   sizes: '96x96',   type: 'image/png' 
  	  },
      { src: 'https://source.unsplash.com/128x128/?nature,water',  sizes: '128x128', type: 'image/png' },
      { src: 'https://source.unsplash.com/192x192/?nature,water', sizes: '192x192', type: 'image/png' },
      { src: 'https://source.unsplash.com/256x256/?nature,water', sizes: '256x256', type: 'image/png' },
      { src: 'https://source.unsplash.com/384x384/?nature,water', sizes: '384x384', type: 'image/png' },
      { src: 'https://source.unsplash.com/512x512/?nature,water', sizes: '512x512', type: 'image/png' },
    ]
  });

  navigator.mediaSession.setActionHandler('play', AudPlayPause);
  navigator.mediaSession.setActionHandler('pause', AudPlayPause);
  navigator.mediaSession.setActionHandler('previoustrack', playpreviousSong);
  navigator.mediaSession.setActionHandler('nexttrack', nextSong);
}