

export function reducer(state, action) {
    console.log("initial state")
    switch (action.type) {

        case "LOGIN_USER":
            return { isLogin: !state.isLogin }

        default:
            break;
    }
}

export const initialLoginState = { isLogin: false }