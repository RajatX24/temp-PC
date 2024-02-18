import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import useDeleteBlog from '../../hooks/useDeleteBlog';
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog }) {

    const [deleting, success, callAPI] = useDeleteBlog();
    const navigate=useNavigate();

    return (
        <Card sx={{ width: '30vw'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={blog.imageLink}
                    alt="image here"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <ReactMarkdown>{blog.short}</ReactMarkdown>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary" onClick={()=>{navigate(`/editBlog/${blog._id}`)}}>
                    Edit
                </Button>
                <Button size="small" color="primary" onClick={() => {
                    const ans = confirm('Do you want to permanently delete this blog?');
                    if (ans)
                        callAPI(blog._id);
                }}>
                    Delete
                </Button>
            </CardActions>
            {(deleting == null || deleting)?null:(success?alert('Blog deleted successfully'):alert('Blog deletion unsuccessful'))}
        </Card>
    );
}