const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//VoiceRSS Speech Function
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, "%20");
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: "You get a key from https://www.voicerss.org/api/ for free",
        src: jokeString,
        hl: "en-us",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

// get Jokes from Joke API
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data)
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //console.log( joke);
        tellMe(joke);
        toggleButton();
    } catch (error) {
        alert(error);
    }
}

//getJokes();
//event listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
