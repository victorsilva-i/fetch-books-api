import moment from "moment";
import React, { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { fetchAllBooks } from "./resources/FetchAPI";
import { DataGrid } from "@material-ui/data-grid";
import { NoRecords } from "./components/NoRecords";
import { TableWrapper } from "./components/TableWrapper";
function App() {
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [booksFilteredList, setFilteredBooksList] = useState([]);

  function filterList(e) {
    const value = e.target.value;
    setFilterText(value);
  }

  useEffect(() => {
    fetchAllBooks(setLoading, setBooksList, setFilteredBooksList);
  }, []);

  useEffect(() => {
    const allBooksList = booksList;
    if (filterText === "") {
      return setFilteredBooksList(allBooksList);
    }
    const filteredList = allBooksList.filter(
      (item) =>
        item.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1 ||
        moment(item.publishDate)
          .format("YYYY-MM-DD HH:MM:ss")
          .indexOf(filterText) > -1
    );
    setFilteredBooksList(filteredList);
  }, [filterText, booksList]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <form className="search">
        <input
          type="text"
          placeholder="Search By Title or Publish Date"
          name="search"
          onChange={filterList}
        />
      </form>
      <TableWrapper>
        {booksFilteredList.length > 0 ? (
          <DataGrid
            rows={booksFilteredList}
            columns={[
              { field: "title", headerName: "Title", width: 200 },
              { field: "description", headerName: "Description", width: 200 },
              {
                field: "publishDate",
                render: (rowData) =>
                  moment(rowData.publishDate).format("YYYY-MM-DD HH:MM:ss"),
                headerName: "Publish Date",
                width: 200,
              },
            ]}
            pageSize={5}
          />
        ) : (
          <NoRecords />
        )}
      </TableWrapper>
    </>
  );
}

export default App;
