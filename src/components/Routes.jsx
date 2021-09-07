import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={(props) => (
            (currentUser._id !== null && currentUser.name !==null) ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    )
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={(props) => (
            (currentUser._id === null && currentUser.name !== null) ? <Component {...props} /> : <Redirect to="/join" />
        )} />
    )
}

export { PrivateRoute, ProtectedRoute };