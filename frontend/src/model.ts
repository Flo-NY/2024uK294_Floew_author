export type Author = {
  id: number;
  author_name: string;
  birth_date: Date;
};
export type AuthenticationResponse = {
  accessToken: string;
  user: UserLogin;
};
export type User = {
  email: string;
  id: number;
};
export type UserLogin = {
  email: string;
  password: string;
};
