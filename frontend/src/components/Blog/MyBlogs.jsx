import React from 'react'
import { Typography, Fab } from '@mui/material';
import MyBlogCard from './MyBlogCard'
import NoDataFoundCard from './NoDataFoundCard'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


function MyBlogs({ blogs, loading }) {
    const navigate=useNavigate();

    return <>
        <Typography variant="h4">My Blogs</Typography>
        {console.log(blogs)}
        {
            loading ?
                <Typography variant="body1">loading...</Typography>
                :
                blogs.length != 0 ?
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5vh',flexWrap:'wrap' }}>
                        {blogs.map((ele) => <MyBlogCard blog={ele} />)}
                    </div>
                    :
                    <NoDataFoundCard imgLink={'https://vectorified.com/images/no-data-icon-10.png'} />
        }
        <div className='button-bar' style={{display:'flex', justifyContent:'right'}}>
            <Fab color="primary" aria-label="add"  onClick={()=>navigate("newBlog")}>
                <AddIcon />
            </Fab>
        </div>
    </>
}

export default MyBlogs;