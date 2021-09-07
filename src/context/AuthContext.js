import { createContext } from "react";

const AuthContext = createContext({
    currentUser: "",
    setCurrentUser: ""
});

export default AuthContext;