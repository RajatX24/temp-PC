import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

export default function BlogCard({ blog, full }) {
  const navigate = useNavigate();
  const cardMarginLeft = full?'10vw':'0vw';
  const cardMarginTop = full?'10vh':'2vh';
  const cardWidth = full ? '50vw' : '30vw';
  const titleSize = full ? 'h3' : 'h6';
  const cardBorder = full ? '0px' : '1px solid #eeeeee';
  const cardcontent=(<CardContent>
    <CardMedia
      component="img"
      height="140"
      image={blog.imageLink}
      alt="image here"
    />
    <Typography gutterBottom variant={titleSize} component="div">
      {blog.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      <ReactMarkdown>{full ? blog.body : blog.short}</ReactMarkdown>
    </Typography>
  </CardContent>)

  return (
    <Card sx={{ width: cardWidth,marginLeft:cardMarginLeft,marginTop:cardMarginTop,border:cardBorder}}>
      {full ? cardcontent:<CardActionArea onClick={() => navigate(`readBlog/${blog._id}`)}>{cardcontent}</CardActionArea>
      }
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}