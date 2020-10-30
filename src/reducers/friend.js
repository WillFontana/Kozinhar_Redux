import { getToken } from "../services/auths";
const cdusuario = parseInt(getToken());

const friend = (state = { cdusuario }, action) => {
    switch (action.type) {
        case "FOCUS_FRIEND":
            return state.cdusuario !== action.cdusuario ? { ...state, cdusuario: action.cdusuario } : state;
        default:
            return state;
    }
}

export default friend;