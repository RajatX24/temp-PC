import React from 'react'
import { Card, Typography, CardContent } from '@mui/material';
import BlogWriter from '../../components/Blog/BlogWriter/BlogWriter';
import useSaveBlog from '../../hooks/useSaveBlog'

function CreateNewBlogPage() {
    return <>
        <Typography variant="h3">Create New Blog</Typography>
        <Card>
            <CardContent>
                <BlogWriter hook={useSaveBlog}/>
            </CardContent>
        </Card>
    </>
}

export default CreateNewBlogPage;