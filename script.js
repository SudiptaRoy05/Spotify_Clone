console.log("JS Start");

async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:5500/songs/");
        let html = await response.text();

        let div = document.createElement("div");
        div.innerHTML = html;

        let as = div.getElementsByTagName("a");

        let songs = [];

        for (let index = 0; index < as.length; index++) {
            const element = as[index];

            if (element.href.endsWith(".mp3")) {
                songs.push(element.href); // Push the href, not the element itself
            }
        }
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

async function main() {
    try {
        // Get the list of songs
        let songs = await getSongs();
        console.log(songs);

        // Play the first song
        if (songs.length > 0) {
            var audio = new Audio(songs[0]);
            audio.play(); // Correctly invoking the play method
        } else {
            console.log("No songs found");
        }
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();
