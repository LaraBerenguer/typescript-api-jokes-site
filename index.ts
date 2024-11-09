const button = document.querySelector(".jokes_btn");
let jokesContainer = document.querySelector(".joke_container");
let weatherContainer = document.querySelector(".weather_container");

const scoreBtn1 = document.getElementById("score1");
const scoreBtn2 = document.getElementById("score2");
const scoreBtn3 = document.getElementById("score3");
const statusElement = document.getElementById("status");

interface Joke {
    id: number,
    joke: string
}

interface NorrisJoke {
    id: string,
    value: string
}

interface Score {
    joke: string;
    score: number;
    date: string;
}

//get jokes

let reportJokes: Score[] = [];

const getJokes = async (): Promise<string> => {
    const response = await fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
        throw new Error("API mal " + response.status);
    }

    const data: Joke = await response.json()
    console.log("data: ", data);

    let finalJoke = data.joke;
    return finalJoke;
}

const getChuckNorrisJokes = async (): Promise<string> => {
    const response = await fetch("https://api.chucknorris.io/jokes/random", { headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
        throw new Error("API mal " + response.status);
    }

    const data: NorrisJoke = await response.json()
    console.log("Norris data: ", data);

    let finalNorrisJoke = data.value
    return finalNorrisJoke;
}

//decide random jokes

const getRandomJoke = async () => {
    let randomNumber = Math.random() < 0.5 ? getJokes() : getChuckNorrisJokes();
    return await randomNumber;
}

//print joke

const printJokes = async () => {
    try {
        let finalJoke = await getRandomJoke();
        jokesContainer!.textContent = finalJoke;
    }

    catch (error) {
        jokesContainer!.textContent = "Error: joke couldn't load";
    }
}

//rating jokes

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

    //Find if score already exists
    let existingJoke = reportJokes.find(jokes => jokes.joke === jokeString);

    if (!existingJoke) {
        reportJokes.push(objectScores);
    } else {
        existingJoke.score = scoreValue;
        existingJoke.date = currentDate;
    }

    return console.log(reportJokes);

}

//get weather

/*

const getWeather = async () => {
    const weatherResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=8dca3ce59fd29705fc5301203cd03e9f", { headers: { 'Accept': 'application/json' } });

    if (!weatherResponse.ok) {
        throw new Error("API mal " + weatherResponse.status);
    }

    const weatherData = await weatherResponse.json()
    console.log("New Weather data: ", weatherData);
    return weatherData;
}

const printWeather = async () => {
    try {
        let currentWeather = await getWeather();
        let icon = currentWeather.weather[0].icon;
        console.log("icon: ", icon);
        let temperature = parseInt(currentWeather.main.temp);

        let weatherHTML = weatherContainer as HTMLInputElement;
        weatherHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="current weather" width="50" height="50" class="weather_icon"><p>${temperature}°C</p>`;

    }

    catch (error) {
        weatherContainer!.textContent = "Weather couldn't load";
    }
}
    */

//location for weather

function geoFindMe(): void {
    const status = document.querySelector("#status") as HTMLElement;
    statusElement!.style.display = "block"

    function success(position: GeolocationPosition): void {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        printWeather(latitude, longitude);
    }

    function error(): void {
        status.textContent = "Showing default location: Barcelona";
        printWeather();
        setTimeout(() => {statusElement!.style.display = "none"}, 5000);
    }

    if (!navigator.geolocation) {
        status.textContent = "Sorry! Your browser does not support Geolocation ):";
        printWeather();
    } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

//new version get and print weather

const getWeather = async (lat?: number, long?: number) => {

    if (typeof lat !== 'undefined') {
        let userLat = lat;
        let userLong = long;

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&units=metric&appid=8dca3ce59fd29705fc5301203cd03e9f`, { headers: { 'Accept': 'application/json' } });

        if (!weatherResponse.ok) {
            throw new Error("API mal " + weatherResponse.status);
        }

        const weatherData = await weatherResponse.json()
        console.log("New Weather data: ", weatherData);
        return weatherData;

    } else {
        const weatherResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=8dca3ce59fd29705fc5301203cd03e9f", { headers: { 'Accept': 'application/json' } });

        if (!weatherResponse.ok) {
            throw new Error("API mal " + weatherResponse.status);
        }

        const weatherData = await weatherResponse.json()
        console.log("New Weather data: ", weatherData);
        return weatherData;
    }

}

const printWeatherNoLocation = () => printWeather(undefined,undefined);


const printWeather = async (lat?: number, long?: number) => {

    if (typeof lat !== 'undefined') {
        let userLat = lat;
        let userLong = long;

        try {
            let currentWeather = await getWeather(userLat, userLong);
            let icon = currentWeather.weather[0].icon;            
            let temperature = parseInt(currentWeather.main.temp);

            let weatherHTML = weatherContainer as HTMLInputElement;
            weatherHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="current weather" width="50" height="50" class="weather_icon"><p>${temperature}°C</p>`;

        }

        catch (error) {
            weatherContainer!.textContent = "Weather couldn't load";
        }
    } else {
        try {
            let currentWeather = await getWeather();
            let icon = currentWeather.weather[0].icon;
            console.log("icon: ", icon);
            let temperature = parseInt(currentWeather.main.temp);

            let weatherHTML = weatherContainer as HTMLInputElement;
            weatherHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="current weather" width="50" height="50" class="weather_icon"><p>${temperature}°C</p>`;

        }

        catch (error) {
            weatherContainer!.textContent = "Weather couldn't load";
        }
    }

}

//buttons and first load

button!.addEventListener('click', printJokes);
scoreBtn1?.addEventListener('click', () => rateJokes(parseInt(scoreBtn1?.getAttribute("data-score") || "0")));
scoreBtn2?.addEventListener('click', () => rateJokes(parseInt(scoreBtn2?.getAttribute("data-score") || "0")));
scoreBtn3?.addEventListener('click', () => rateJokes(parseInt(scoreBtn3?.getAttribute("data-score") || "0")));
document.querySelector("#find_location")?.addEventListener("click", geoFindMe);

document.addEventListener('DOMContentLoaded', printJokes);
document.addEventListener('DOMContentLoaded', printWeatherNoLocation);