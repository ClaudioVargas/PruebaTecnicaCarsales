import { EpisodioModel } from "./episodio.model"
import { PersonajeModel } from "./personaje.model"

export interface GetResponseModel {
    "info": {
        "count": number,
        "pages": number,
        "next": string,
        "prev": string
    },
    "results": PersonajeModel []
}

export interface GetResponseEpisodioModel {
    "info": {
        "count": number,
        "pages": number,
        "next": string,
        "prev": string
    },
    "results":  EpisodioModel []
}