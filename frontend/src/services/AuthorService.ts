import { Author } from "../model";
import Api from "./Api";
import { getToken } from "./UserService";
type RequestAuthor = {
  id: number;
  author_name: string;
  birth_date: string;
};
function requestAuthorToAuthor({
  id,
  author_name,
  birth_date,
}: RequestAuthor): Author {
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

export async function getAuthorPage(pageNumber: number) {
  const token = getToken();
  const requestAuthors = await Api.get<RequestAuthor[]>(
    `author?_page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return requestAuthors.data.map(requestAuthorToAuthor);
}
