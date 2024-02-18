import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import SearchBar from '../components/News/SearchBar/SearchBar.jsx';
import NewsCardMui from '../components/News/NewsCardMui/NewsCardMui.jsx'
import '../App.css';

function News() {
    const [newsArr, setNewsArr] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState(undefined);

    async function getNews() {
        const searchurl = searchQuery
            ? `https://api.thenewsapi.com/v1/news/all?api_token=3jSN2TSCd6dkcVhb3rxh6T3NY4XmxFQkcV12vuxN&limit=3&locale=in&search=${searchQuery}`
            : 'https://api.thenewsapi.com/v1/news/all?api_token=3jSN2TSCd6dkcVhb3rxh6T3NY4XmxFQkcV12vuxN&locale=in&limit=3';

        const response = await axios.get(searchurl);
        setNewsArr(response.data.data);
    }

    async function getNews2() {
        const searchurl ='https://newsapi.org/v2/everything?q=chess&searchIn=title&apiKey=2507987ec7094d48b65d663164b596e8';

        const response = await axios.get(searchurl);
        console.log(response);
        console.log(response.data);
        console.log(response.data.articles);
        setNewsArr(response.data.articles);
    }

    useEffect(() => {
        if (newsArr.length == 0) {
            getNews2();
        }
    }, []); // Run once on mount

    return (
        <>
            <Typography variant='h3' style={{ marginTop: '5vh' }}>📰 News</Typography>
            {/* <SearchBar getNews={getNews} setSearchQuery={setSearchQuery} /> */}
            {newsArr ? (
                <div id='newsBox' style={{ display: 'flex', flexWrap: 'wrap',marginTop:'2em', padding: '10px', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    {newsArr.map((ele, index) => (
                        <NewsCardMui key={index} news={ele} />
                    ))}
                </div>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
}

export default News;
