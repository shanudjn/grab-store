import { createContext, useContext, useReducer } from "react";
import { reducer, initialLoginState } from '../reducer/reducer';


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [state, authDispatch] = useReducer(reducer, initialLoginState)
    console.log({ state })
    return <AuthContext.Provider value={{ login: state.isLogin, authDispatch }} >
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}