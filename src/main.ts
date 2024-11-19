import { IFilm } from "./contracts/IFilm";
import { IPeople } from "./contracts/IPeople";
import { IPlanet } from "./contracts/IPlanet";
import "./style.css";

// ! HAUPTGANG
const BASE_URL = "https://swapi.dev/api/";

// ! Der Anschluss zu Character
const FILMS_ROUTE = `${BASE_URL}/films/`;

// ! Der Anschluss zu Location
const PLANET_ROUTE = `${BASE_URL}/planets/`;

// ! Der Anschluss zu Episode
const PEOPLE_ROUTE = `${BASE_URL}/people/`;

const outputElement = document.getElementById("output") as HTMLDivElement;
const characterElement = document.getElementById("api-character") as HTMLAnchorElement;
const planetElement = document.getElementById("api-planet") as HTMLAnchorElement;
const filmElement = document.getElementById("api-film") as HTMLAnchorElement;

characterElement?.addEventListener("click", async () => {
    try {
        const response: Response = await fetch(PEOPLE_ROUTE);
        const data = await response.json();
        outputElement.innerHTML = "";

        /*         console.log(response);
        console.log(data);
        console.log(data.results); */

        data.results.forEach(async (character: IPeople) => {
            const createCharacter = document.createElement("div") as HTMLDivElement;
            createCharacter.innerHTML = await displayCharacter(character);
            outputElement.appendChild(createCharacter);
        });
    } catch (error) {
        console.error(error);
    }
});

async function displayCharacter(character: IPeople) {
    const comesFrom = await fetchComesFrom(character.homeworld);
    const characterStringCreator = `
    <h3> Name: ${character.name} </h4>
    <p> <strong>From:</strong> ${comesFrom} </p>
    <p> <strong>Gender:</strong> ${character.gender} </p> 
    <p> <strong>B'Day:</strong> ${character.birth_year} </p> 
    --------------------------------------------------
    `;
    return characterStringCreator;
}

async function fetchComesFrom(homeworld: string): Promise<string> {
    const response: Response = await fetch(homeworld);
    const data: IPlanet = await response.json();
    return data.name;
}

planetElement?.addEventListener("click", async () => {
    try {
        const response = await fetch(PLANET_ROUTE);
        const data = await response.json();
        outputElement.innerHTML = "";

        await Promise.all(
            data.results.map(async (planet: IPlanet) => {
                console.log(planet);
                const planetDiv = document.createElement("div") as HTMLDivElement;
                planetDiv.innerHTML = await displayPlanet(planet);
                outputElement.appendChild(planetDiv);
            })
        );
    } catch (error) {
        console.error(error);
    }
});

async function displayPlanet(planet: IPlanet): Promise<string> {
    const resultAsString = `
    <h5>Name: ${planet.name}</h5>
    <p>Diameter: ${planet.diameter}</p>
    <p>Climate: ${planet.climate}</p>
    `;

    return resultAsString;
}

filmElement?.addEventListener("click", async () => {
    try {
        const response = await fetch(FILMS_ROUTE);
        const data = await response.json();
        outputElement.innerHTML = "";

        await Promise.all(
            data.results.map(async (film: IFilm) => {
                console.log(film);
                const filmDiv = document.createElement("div") as HTMLDivElement;
                filmDiv.innerHTML = await displayFilm(film);
                outputElement.appendChild(filmDiv);
            })
        );
    } catch (error) {
        console.error(error);
    }
});

async function displayFilm(film: IFilm): Promise<string> {
    const resultAsString = `
    <h5>Name: ${film.title}</h5>
    <p>Director: ${film.director}</p>
    <p>Producer: ${film.producer}</p>
    `;

    return resultAsString;
}
