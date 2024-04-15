import axios from "axios";
import React from "react";

export default function useUpdateBlogWithId() {
  const [saving, setSaving] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  async function callAPI(blogId, title, imageLink, body) {
    setSaving(true);
    const short = body.slice(0, 50);
    //https://blog-app-three-woad.vercel.app/
    //http://localhost:3000/user/blogs/${blogId}
    const url = import.meta.env.VITE_SERVER_URL + `/user/blogs/${blogId}`;
    axios
      .put(
        url,
        {
          title,
          body,
          imageLink,
          short,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
        setSuccess(false);
      })
      .finally(() => setSaving(false));
  }

  return [saving, success, callAPI];
}
