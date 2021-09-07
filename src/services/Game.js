import axios from "axios";
import { JWTHeader } from "../config/Headers";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const createGame = async (token, startedBy, title) => {
    try {
        const config = {
            method: 'post',
            url: `${backendURL}/game/new`,
            headers: JWTHeader(token),
            data: {
                started_by: startedBy,
                title
            }
        }
        const response = await axios(config);
        return ({
            success: response.data.message,
            gameId: response.data._id
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const getMyGames = async (token) => {
    try {
        const config = {
            method: 'get',
            url: `${backendURL}/game`,
            headers: JWTHeader(token),
        }
        const response = await axios(config);
        return (response.data.games);
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const getGame = async (token, gameId) => {
    try {
        const config = {
            method: 'get',
            url: `${backendURL}/game/${gameId}`,
            headers: JWTHeader(token),
        }
        const response = await axios(config);
        return (response.data.game);
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const addQuestion = async (token, gameId, question) => {
    try {
        const config = {
            method: 'post',
            url: `${backendURL}/game/question`,
            headers: JWTHeader(token),
            data: {
                gameId,
                question
            }
        }
        const response = await axios(config);
        return ({
            success: response.data.message
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

export { createGame, getMyGames, getGame, addQuestion }