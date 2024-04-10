import { useState } from "react";
import AuthorList from "../organisms/AuthorList";
import Navbar from "../organisms/Navbar";

function AuthorsPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAuthorListFunction = () => {
    setOpenAddDialog(true);
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-2">
      <Navbar onClick={handleAuthorListFunction} />
      <div className="px-3">
        <AuthorList
          setOpenAddDialog={setOpenAddDialog}
          openAddDialog={openAddDialog}
        />
      </div>
    </div>
  );
}

export default AuthorsPage;
