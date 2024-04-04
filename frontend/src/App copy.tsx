import { useEffect, useState } from "react";
import "./App.css";
import { Author, getAuthorPage } from "./services/AuthorService";

function App() {
  const [authorList, setAuthorList] = useState<Author[]>();
  useEffect(() => {
    getAuthorPage(1).then((list) => {
      setAuthorList(list);
    });
  }, []);
  return (
    <>
      <div> {`${import.meta.env.VITE_BASE_API_URL} <--here`}</div>
      <div>{JSON.stringify(authorList)}</div>
    </>
  );
}

export default App;
