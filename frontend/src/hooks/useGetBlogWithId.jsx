import React from "react";
import axios from "axios";

function useGetBlogWithId(blogId) {
  const [loading, setLoading] = React.useState(true);
  const [blog, setBlog] = React.useState({});

  React.useEffect(() => {
    //https://blog-app-three-woad.vercel.app/
    //http://localhost:3000/user/blogs/${blogId}
    const url = import.meta.env.VITE_SERVER_URL + `/user/blogs/${blogId}`;
    axios
      .get(url, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setBlog(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching blogs:", error);
        setBlog({});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [blog, loading];
}

export default useGetBlogWithId;
