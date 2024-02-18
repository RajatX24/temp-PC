import React from 'react';
import { TextField,Button } from '@mui/material';
import './SearchBar.css'
import '../../../App.css'
import '../../../colors.css'

function SearchBar(props) {
    const handleSearchClick = () => {
        console.log("button clicked")
        props.getNews(props.searchQuery);
    };

    return (
        <div>
            <input type='text' style={{height:'5vh',width:'35vw',marginTop:'2vh'}} onChange={(event)=>{props.setSearchQuery(event.target.value);}}/>
            <Button variant="contained" className='green' onClick={handleSearchClick} style={{height:'6vh',margin:'0'}}>Search</Button>
        </div>
    );
}

export default SearchBar;
