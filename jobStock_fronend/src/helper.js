// import jwtDecode from "jwt-decode";
import jwt_decode from 'jwt-decode';



export const removeToken = () => {
    localStorage.removeItem("token");
    return true;
}
export const getUser = () => {
    const token = localStorage.getItem("token");
    if(token) {
        return jwt_decode(token);
    }
    return null;
}