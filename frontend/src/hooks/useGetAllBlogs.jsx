import React from "react";
import axios from "axios";

function useGetAllBlogs() {
    const [loading, setLoading] = React.useState(true);
    const [blogs,setBlogs] = React.useState([]);

    React.useEffect(() => {
        //https://blog-app-three-woad.vercel.app/
        //http://localhost:3000/user/blogs
        const url=import.meta.env.VITE_SERVER_URL+`/user/blogs`;
        axios.get(url, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(function (response) {
                console.log('AllBlogs=>')
                console.log(response.data);
                setBlogs(response.data);
            })
            .catch(function (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { blogs, loading };
}

export default useGetAllBlogs;