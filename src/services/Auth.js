import axios from "axios";
import { AuthHeader, JWTHeader } from "../config/Headers";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Register = async (name, email, password) => {
    try {
        const config = {
            method: 'post',
            url: `${backendURL}/user/register`,
            headers: AuthHeader(),
            data: {
                name,
                email,
                password
            }
        }
        const response = await axios(config);
        return ({
            success: response.message
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const Login = async (email, password) => {
    try {
        let config = {
            method: 'post',
            url: `${backendURL}/user/login`,
            headers: AuthHeader(),
            data: {
                email,
                password
            }
        }
        let token = await axios(config);
        token = token.data.token;
        config = {
            method: 'get',
            url: `${backendURL}/user`,
            headers: JWTHeader(token)
        }
        let response = await axios(config)
        return ({
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            token: token
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

export { Login, Register }