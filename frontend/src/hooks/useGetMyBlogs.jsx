import React from "react";
import axios from "axios";

function useGetMyBlogs() {
  const [loading, setLoading] = React.useState(true);
  const [myBlogs, setMyBlogs] = React.useState([]);

  React.useEffect(() => {
    //https://blog-app-three-woad.vercel.app/
    //http://localhost:3000/user/myBlogs
    const url = import.meta.env.VITE_SERVER_URL + `/user/blogs/myBlogs`;
    axios
      .get(url, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token,
        },
      })
      .then(function (response) {
        console.log("myBlogs=>");
        console.log(response.data);
        setMyBlogs(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching blogs:", error);
        setMyBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { myBlogs, loading };
}

export default useGetMyBlogs;
