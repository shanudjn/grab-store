import { Navigate, Route } from "react-router-dom";


export function PrivateRoute({ path, ...props }) {
    const login = true;
    return login ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to='/login' />
}