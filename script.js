console.log("JS STARTS");

let currentSong = new Audio();

function secToMin(second) {
    if (isNaN(second) || second < 0) {
        return "00:00";
    }
    const minutes = Math.floor(second / 60);
    const remSec = Math.floor(second % 60);

    const formattedMin = String(minutes).padStart(2, "0");
    const formattedSec = String(remSec).padStart(2, "0");

    return `${formattedMin}:${formattedSec}`;
}



async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    // console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;


    let as = div.getElementsByTagName("a");
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }

    return songs


}
getSongs();


const playMusic = (track, pause = false) => {

    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play();
        playPause.src = "logo/pause.svg";
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function main() {

    //get all song
    let songs = await getSongs()
    playMusic(songs[0], true);
    // Show all the songs of the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img class="invert" src="logo/music.svg" alt="">
        <div class="info">
            <div class="songName">
            ${song.replaceAll("%20", " ")}
            </div>
            <div class="songArt">
                Sudipta
            </div>
        </div>
       <div class="playNow">
        <span>Play Now</span>
        <img class="invert" src="logo/play.svg" alt="">
       </div>
    </li>`;
    }

    //attach an event listener

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    });
    // attach event Listener to play Pause next and privous
    playPause.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playPause.src = "logo/pause.svg";
        } else {
            currentSong.pause(); // Corrected from currentSong.paused()
            playPause.src = "logo/play.svg";
        }
    });

    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${secToMin(currentSong.currentTime)} / ${secToMin(currentSong.duration)}`;


        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // add eventListener to seekbar
    document.querySelector(".seekBar").addEventListener("click", e =>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width)*100 ;
        document.querySelector(".circle").style.left = percent+"%";

        currentSong.currentTime = ((currentSong.duration)* percent)/100
    })
}

main()