import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isValidJWT = (token) => {
  // Un JWT se compose de trois parties séparées par des points (header.payload.signature)
  const parts = token?.split(".");
  if (parts?.length !== 3) {
    return false; // Mauvaise structure
  }

  try {
    // Décodage du header et du payload pour vérifier s'ils sont bien en base64
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    // Vérifie la présence des champs typiques dans le header (ex: alg, typ)
    return (
      header &&
      payload &&
      typeof header === "object" &&
      typeof payload === "object"
    );
  } catch (e) {
    // Si la base64 est mal formée ou si JSON.parse échoue
    return false;
  }
};

const logout = () => {
  delete axios.defaults.headers["Authorization"];
  window.localStorage.removeItem("token");
};

const setup = () => {
  const token = window.localStorage.getItem("token");
  if (isValidJWT(token)) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  } else {
    logout();
  }
};

const getRole = () => {
  const token = window.localStorage.getItem("token");
  return isValidJWT(token) ? jwtDecode(token).poste_id : null;
};
const setTokenInLocalStorage = (token) => {
  window.localStorage.setItem("token", token);
  axios.defaults.headers["Authorization"] = "Bearer " + token;
};

const decodeToken = (token) => {
  return isValidJWT(token) && jwtDecode(token);
};

const isValidToken = () => {
  const token = window.localStorage.getItem("token");
  if (!isValidJWT(token)) {
    return false;
  }
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return false;
  }
  return true;
};
const tokenDecode = () => {
  const token = window.localStorage.getItem("token");
  return jwtDecode(token);
};

const isAdmin = () => {
  return getRole() == "1";
};

const isChef = () => {
  return getRole() == "2";
};

export default {
  getRole,
  logout,
  setup,
  setTokenInLocalStorage,
  decodeToken,
  isValidToken,
  tokenDecode,
  isAdmin,
  isChef,
};
