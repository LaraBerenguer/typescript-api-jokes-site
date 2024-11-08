const button = document.querySelector(".jokes_btn");
let jokesContainer = document.querySelector(".joke_container");
let weatherContainer = document.querySelector(".weather_container");
let scoreBtn1 = document.getElementById("score1");
let scoreBtn2 = document.getElementById("score2");
let scoreBtn3 = document.getElementById("score3");

interface Joke {
    id: number,
    joke: string
}

interface Score {
    joke: string;
    score: number;
    date: string;
}

let reportJokes: Score[] = [];

const getJokes = async (): Promise<Joke> => {
    const response = await fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
        throw new Error("API mal " + response.status);
    }

    const data: Joke = await response.json()
    console.log("data: ", data);
    return data;
}


const printJokes = async () => {
    try {
        let newJoke = await getJokes();
        jokesContainer!.textContent = newJoke.joke;
    }

    catch (error) {
        jokesContainer!.textContent = "Error: joke couldn't load";
    }
}


const rateJokes = async (scoreValue: number) => {

    //joke
    let jokeString = (jokesContainer?.textContent) || "";

    //score
    let score = scoreValue;

    //date
    let currentDate = (new Date()).toISOString();

    //let reportJokes: Score[] = [];
    let objectScores = {} as Score;

    objectScores.date = currentDate;
    objectScores.joke = jokeString;
    objectScores.score = score;

    //Find if a score already exists
    let existingJoke = reportJokes.find(jokes => jokes.joke === jokeString);

    if (!existingJoke) {
        reportJokes.push(objectScores);
    } else {
        existingJoke.score = scoreValue;
        existingJoke.date = currentDate;
    }

    return console.log(reportJokes);

}

const getWeather = async () => {
    const weatherResponse = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019", { headers: { 'Accept': 'application/json' } });

    if (!weatherResponse.ok) {
        throw new Error("API mal " + weatherResponse.status);
    }

    const weatherData = await weatherResponse.json()
    console.log("Weather data: ", weatherData);
    return weatherData;
}

const printWeather = async () => {
    try {
        let currentWeather = await getWeather();
        let sky = currentWeather.stateSky.description;
        let temperature = currentWeather.temperatura_actual;        

        weatherContainer!.textContent = `Current weather: ${sky}, ${temperature}°C`;
    }

    catch (error) {
        weatherContainer!.textContent = "Weather couldn't load";
    }
}

button!.addEventListener('click', printJokes);
scoreBtn1?.addEventListener('click', () => rateJokes(parseInt(scoreBtn1?.getAttribute("data-score") || "0")));
scoreBtn2?.addEventListener('click', () => rateJokes(parseInt(scoreBtn2?.getAttribute("data-score") || "0")));
scoreBtn3?.addEventListener('click', () => rateJokes(parseInt(scoreBtn3?.getAttribute("data-score") || "0")));

document.addEventListener('DOMContentLoaded', printJokes);
document.addEventListener('DOMContentLoaded', printWeather);