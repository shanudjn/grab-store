

export function reducer(state, action) {
    const { type, payload } = action
    switch (type) {

        case "LOGIN_USER":
            return { isLogin: !state.isLogin, userId: payload.registeredUserId }
        case "LOGOUT_USER":
            return { isLogin: !state.isLogin }
        default:
            break;
    }
}

export const initialLoginState = { isLogin: false, userId: "" }