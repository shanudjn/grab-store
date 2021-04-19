import axios from "axios";


export async function reducer(state, action) {
    switch (action.type) {

        case "LOGIN_USER":
            console.log("inside lofin reducer")
            try {
                const response = await axios.post("https://ecommerce.shahazad.repl.co/login", { name: "Shahazad", password: "qwerty" })
                console.log(response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    return {
                        isLogin: true
                    }
                }
                else {
                    return { ...state }
                }
            } catch (error) {
                console.log(error)
            }
            break;

        default:
            break;
    }
}

export const initialLoginState = { isLogin: false }