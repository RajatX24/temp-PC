import React from 'react'
import {Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import useGetBlogWithId from '../../hooks/useGetBlogWithId';
import BlogCard from '../../components/Blog/BlogCard';

function ReadBlogPage() {
    const { blogId } = useParams();
    const [blog, loading] = useGetBlogWithId(blogId);

    return <>
        <Typography variant='h3'>Read Blog Page</Typography>
        {loading ? 'loading' : <BlogCard blog={blog} full={true} />}
    </>
}

export default ReadBlogPage;