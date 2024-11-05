const button = document.querySelector(".jokes_btn");
let jokesContainer = document.querySelector(".joke_container");

interface Joke {
    id: number,
    joke: string
}

const getJokes = async (): Promise<Joke> => {
    const response = await fetch("https://icanhazdadjoke.com/",
        {
            headers: {
                'Accept': 'application/json'
            }
        });

    if (!response.ok) {
        throw new Error("API mal");
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

button!.addEventListener('click', printJokes);
document.addEventListener('DOMContentLoaded', printJokes);


//Ejercicio dos se puede usar stringify
//printJokes
// por qué da error en la terminal???? 














