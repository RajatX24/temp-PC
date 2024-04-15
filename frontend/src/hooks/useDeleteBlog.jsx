import axios from "axios";
import React from "react";

export default function useDeleteBlog() {
  const [deleting, setDeleting] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  async function callAPI(blogId) {
    setDeleting(true);
    //https://blog-app-three-woad.vercel.app/
    //http://localhost:3000/user/blogs/${blogId}
    const url = import.meta.env.VITE_SERVER_URL + `/user/blogs/${blogId}`;

    axios
      .delete(url, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
        },
      })
      .then(function (response) {
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
        setSuccess(false);
      })
      .finally(() => setDeleting(false));
  }

  return [deleting, success, callAPI];
}
