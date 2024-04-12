console.log("JS STARTS");

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
            ${song.replaceAll("%20"," ")}
            </div>
            <div class="songArt">
                Sudipta
            </div>
        </div>
       <div class="playNow">
        <span>Play Now</span>
        <img class="invert" src="logo/play.svg" alt="">
       </div>
    </li>
`;
    }


    
}

main()