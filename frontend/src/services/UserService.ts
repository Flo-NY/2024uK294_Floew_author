import { AuthenticationResponse, UserLogin } from "../model";
import Api from "./Api";

export function setToken(token: string) {
  sessionStorage.setItem("token", token);
}
export async function tokenValid() {
  const token = sessionStorage.getItem("token");
  if (!token) return false;
  const request = await Api.get(`users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (request.status === 200) return true;
  return false;
}

export async function loginUser(userDetails: UserLogin) {
  const userResponce = await Api.post<AuthenticationResponse>(
    "login",
    userDetails
  );
  setToken(userResponce.data.accessToken);
}
export async function registerUser(userDetails: UserLogin) {
  const userResponce = await Api.post<AuthenticationResponse>(
    "register",
    userDetails
  );
  setToken(userResponce.data.accessToken);
}
export async function logoutUser() {
  sessionStorage.removeItem("token");
}