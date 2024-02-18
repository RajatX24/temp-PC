import React from 'react'
import { Card, Typography, CardContent } from '@mui/material';
import BlogWriter from '../../components/Blog/BlogWriter/BlogWriter';
import { useParams } from 'react-router-dom'
import useGetBlogWithId from '../../hooks/useGetBlogWithId';
import useUpdateBlogWithId from '../../hooks/useUpdateBlogWithId';


function EditBlogPage() {
    const { blogId } = useParams();
    const [blog,loading] = useGetBlogWithId(blogId);
    return <>
        <Typography variant="h3">Edit Blog</Typography>
        <Card>
            <CardContent>
                {loading?loading:<BlogWriter hook={useUpdateBlogWithId} blog={blog}/>}
            </CardContent>
        </Card>
    </>
}

export default EditBlogPage;