import React from 'react'
import { Box,Typography } from '@mui/material';
import './BlogHomePage.css'
import BlogHomePage from './BlogHomePage.jsx'


function BlogHomepageContainer() {
    return <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant='h3' style={{ marginTop: '5vh' }}>📖 Blogs</Typography>
            <BlogHomePage/>
        </Box>

    </>
}

export default BlogHomepageContainer;