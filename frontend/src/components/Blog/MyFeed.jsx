import React from 'react'
import { Typography } from '@mui/material';
import BlogCard from '../../components/Blog/BlogCard';

function MyFeed({blogs,loading}) {
    return <>
        <Typography variant="h4">My Feed</Typography>
        {
            loading?
                <Typography variant="body1">loading...</Typography>
                :
                <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'5vh',flexWrap:'wrap'}}>
                    {blogs.map((ele) => <BlogCard blog={ele} full={false}/>)}
                </div>
        }
    </>
}

export default MyFeed;