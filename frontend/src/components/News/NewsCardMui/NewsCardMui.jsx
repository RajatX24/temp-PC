import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import '../../../colors.css'
import './NewsCardMui.css'

export default function NewsCardMui(props) {
  return (
    <Link to={props.news.url}>
      <Card sx={{ width:'345px',height:'345px', backgroundColor:'#302E2B',margin:'0.2em' }} className='newsCard'>
        <CardMedia
          sx={{ height: 140 }}
          image={props.news.urlToImage}
          title="News Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{textDecoration:'none'}}>
            {props.news.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.news.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
