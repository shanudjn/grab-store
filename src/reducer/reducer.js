

export function reducer(state, action) {
    const { type, payload } = action
    switch (type) {

        case "LOGIN_USER":
            return { isLogin: !state.isLogin, userId: payload.registeredUserId }

        default:
            break;
    }
}

export const initialLoginState = { isLogin: false, userId: "" }