import axios from "axios";

const BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1/Books";

export function fetchAllBooks(setLoading, setList, setFilteredBooksList) {
  return axios
    .get(BASE_URL)
    .then((response) => {
      setLoading(false);
      setList(response.data);
      setFilteredBooksList(response.data);
    })
    .catch((error) => {
      try {
        if (error.response.data) {
          alert(error.response.data);
        }
      } catch (error) {
        alert("Internal Error");
      }
    });
}
