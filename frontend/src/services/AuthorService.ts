import { Author, CreateAuthor } from "../model";
import { convertDateToDateString, parseDateStringToDate } from "../utils/DateConversion";
import Api from "./Api";

type ResponseAuthor = {
  id: number;
  author_name: string;
  birth_date: string;
};

function convertResponseAuthorToAuthor({
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

export async function getAllAuthors() {
  const requestAuthors = await Api.get<ResponseAuthor[]>(`author`);
  return requestAuthors.data.map(convertResponseAuthorToAuthor);
}
export async function getAuthorPage(pageNumber: number) {
  const requestAuthors = await Api.get<ResponseAuthor[]>(
    `author?_page=${pageNumber}`
  );
  return {
    authorsPage: requestAuthors.data.map(convertResponseAuthorToAuthor),
    totalAuthorCount: Number(requestAuthors.headers["x-total-count"])
  }
}

export async function deleteAuthor(authorId: number) {
  await Api.delete(`author/${authorId}`);
}

export async function createAuthor(author: CreateAuthor) {
  await Api.post(`author`, {
    author_name: author.author_name,
    birth_date: convertDateToDateString(author.birth_date),
  });
}

export async function updateAuthor(author: Author) {
  await Api.put(`author/${author.id}`, {
    author_name: author.author_name,
    birth_date: convertDateToDateString(author.birth_date),
  });
}
