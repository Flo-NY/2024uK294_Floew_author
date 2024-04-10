export type Author = {
  id: number;
  author_name: string;
  birth_date: Date;
};
export type AuthenticationResponse = {
  accessToken: string;
  user: User;
};
export type User = {
  email: string;
  id: number;
};
export type UserLogin = {
  email: string;
  password: string;
};
export type CreateAuthor = {
  author_name: string;
  birth_date: Date;
};