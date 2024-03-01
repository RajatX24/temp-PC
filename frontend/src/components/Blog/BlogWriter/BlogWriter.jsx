import React from "react";
import ReactMarkdown from "react-markdown";
import './style.css'
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogWriter = (props) => {
    const [text, setText] = React.useState(props.blog?props.blog.body:'## Subheading1');
    const [title, setTitle] = React.useState(props.blog?props.blog.title:'Tile of Blog');
    const [imgLink, setImgLink] = React.useState(props.blog?props.blog.imageLink:'Enter image link here');
    const [saving, success, callAPI] = props.hook?props.hook():[];
    const navigate=useNavigate();

    return (
        <>
            <div className="blog-writer-box" style={{width:'75vw'}}>
                <Card sx={{backgroundColor:'#302E2B'}} style={{ height: '100%', width: '45vw' }}><CardContent style={{ height: '100%', width: '100%', paddingBottom: '2em', display: 'flex', flexDirection: 'column' }} >
                    <TextField onChange={(e) => setTitle(e.target.value)} value={title} style={{ width: '90%', paddingBottom: '1em' }} id="title-textfield" label="Title" variant="outlined" />
                    <TextField onChange={(e) => setImgLink(e.target.value)} value={imgLink} style={{ width: '90%', paddingBottom: '1em' }} id="image-textfield" label="Image link" variant="outlined" />
                    <textarea value={text} style={{ height: '90%', width: '90%' }} onChange={(e) => setText(e.target.value)} className="left-side"></textarea>
                </CardContent></Card>
                <Card style={{ height: '100%', width: '45vw' }}><CardContent style={{ height: '100%', width: '90%', padding: '2em' }}>
                    <div className='right-side'>
                        <Typography variant='h3'>{title}</Typography>
                        <img src={imgLink} alt="blog image" />
                        <ReactMarkdown className='markdown-box' style={{ height: '90%', width: '90%' }}>{text}</ReactMarkdown>
                    </div>
                </CardContent></Card>
            </div>
            <div className='button-bar' style={{ display: 'flex', justifyContent: 'right', paddingTop: '2em' }}>
                <Button variant="contained" onClick={() => { props.blog?callAPI(props.blog._id,title, imgLink, text):callAPI(title, imgLink, text) }}>Save</Button>
                <Button variant="outlined" onClick={()=>confirm('cancel writing blog?')?navigate('/blog'):null}>Cancel</Button>
            </div>
            {/* {saving ? (success ? (alert('Blog Saved Successfully!'),navigate('/blog')):null) : null} */}
            {success ? (alert('Blog Saved Successfully!'),navigate('/blog')):null}
        </>
    )
}

export default BlogWriter;