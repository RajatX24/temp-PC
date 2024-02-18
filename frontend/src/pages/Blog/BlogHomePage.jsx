import React from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import MyFeed from '../../components/Blog/MyFeed';
import MyBlogs from '../../components/Blog/MyBlogs'
import CustomTabPanel from '../../components/Blog/CustomTabPanel';
import useGetAllBlogs from '../../hooks/useGetAllBlogs';
import useGetMyBlogs from '../../hooks/useGetMyBlogs';
import './BlogHomePage.css'

function BlogHomepage() {
    const [value, setValue] = React.useState(0);
    const allBlogs = useGetAllBlogs();
    const myBlogs = useGetMyBlogs();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant='h3' style={{ marginTop: '5vh' }}>📖 Blogs</Typography>

            <Tabs value={value} onChange={handleChange}>
                <Tab label="My Feed" {...a11yProps(0)} />
                <Tab label="My Blogs" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} children={<MyFeed blogs={allBlogs.blogs} loading={allBlogs.loading} />}>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1} children={<MyBlogs blogs={myBlogs.myBlogs} loading={myBlogs.loading} />}>
        </CustomTabPanel>
    </>
}

export default BlogHomepage;