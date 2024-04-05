import { Author } from "../model";
import Api from "./Api";
import { getToken } from "./UserService";
type ResponseAuthor = {
  id: number;
  author_name: string;
  birth_date: string;
};
function responseAuthorToAuthor({
  id,
  author_name,
  birth_date,
}: ResponseAuthor): Author {
  return {
    id: id,
    author_name: author_name,
    birth_date: parseDateStringToDate(birth_date),
  };
}

function parseDateStringToDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month - 1 because months are zero-based in Date object
}
export async function getAllAuthors() {
  const requestAuthors = await Api.get<ResponseAuthor[]>(`author`);
  return requestAuthors.data.map(responseAuthorToAuthor);
}
export async function getAuthorPage(pageNumber: number) {
  const requestAuthors = await Api.get<ResponseAuthor[]>(
    `author?_page=${pageNumber}`
  );
  return requestAuthors.data.map(responseAuthorToAuthor);
}
export async function deleteAuthor(authorId: number) {
  await Api.delete(`author/${authorId}`);
}

type CreateAuthor = {
  author_name: string;
  birth_date: string;
};
export async function createAuthor(author: CreateAuthor) {
  await Api.post(`author`, author);
}
export async function updateAuthor(author: Author) {
  await Api.put(`author/${author.id}`, author);
}
