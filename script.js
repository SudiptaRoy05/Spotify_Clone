console.log("JS STARTS");

let currentSong = new Audio();


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


const playMusic = (track) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    currentSong.play();
    playPause.src = "logo/pause.svg";

    document.querySelector(".songInfo").innerHTML = track
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function main() {

    //get all song
    let songs = await getSongs()
    // console.log(songs);
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
    

}

main()