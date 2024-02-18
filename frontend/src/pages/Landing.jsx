import React from "react";
import ChessBoard from '../assets/Landing/chessboard.png'
import Person1 from '../assets/Landing/chess-GM.jpg'
import Person2 from '../assets/Landing/chess-GM-2.jpg'
import { Typography, Button } from "@mui/material";
import '../colors.css'

function Landing() {
    return <>
        {/*hero section  */}
        <div style={{ width: '80vw', margin: 'auto', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <img src={ChessBoard} alt="chessboard" style={{ width: '40vw' }} />
                <div style={{ display: 'flex', padding: '2em', flexDirection: 'column' }}>
                    <Typography variant='h1' style={{ width: '70%', margin: 'auto',}}>Project Chess</Typography>
                    <Typography style={{ fontStyle: 'italic',width: '55%', margin: 'auto' }}>Play Chess Online on the #1 Site!</Typography>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto' }}>Play now</Button>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto' }}>Learn the Rules</Button>
                </div>
            </div>
            {/*blog section  */}
            <div className='black' style={{ display: 'flex', width:'60vw',marginTop: '5em', justifyContent: 'space-around', padding: '5em' }}>
                <div style={{ width: '50%' }}>
                    <Typography variant='h3' style={{ 'marginBottom': '1em' }}>Read Chess Blogs</Typography>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto' }}>Read now</Button>
                    <div>
                        <div style={{display:'flex',marginTop:'2em'}}>
                            <img src={Person1} alt="personimg" style={{ width: '30%' }} />
                            <Typography style={{ fontStyle: 'italic' }}>"Blogs are a good way to share learnings, pattern recognition, and no site does it better"</Typography>
                        </div>
                    </div>
                </div>
                <img src={ChessBoard} alt="chessboard" style={{ width: '20vw', height: '20%' }} />
            </div>
            {/*chats section  */}
            <div className='black' style={{ display: 'flex', width:'60vw', marginTop: '5em', justifyContent: 'space-around', padding: '5em' }}>
                <img src={ChessBoard} alt="chessboard" style={{ width: '20vw', height: '20%' }} />
                <div style={{ width: '50%' }}>
                    <Typography variant='h3' style={{ 'marginBottom': '1em',float:'right' }}>Chat With Others</Typography>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto',float:'right' }}>Chat now</Button>
                    <div>
                        <div style={{display:'flex',marginTop:'2em',float:'right'}}>
                            <img src={Person1} alt="personimg" style={{ width: '30%',float:'right' }} />
                            <Typography style={{ fontStyle: 'italic',float:'right' }}>"The Project Chess community is awesome! Everybody is willing to share and help each other out!"</Typography>
                        </div>
                    </div>
                </div>
            </div> 
            {/*guilds section  */}
            <div className='black' style={{ display: 'flex', width:'60vw', marginTop: '5em', justifyContent: 'space-around', padding: '5em' }}>
                <div style={{ width: '50%' }}>
                    <Typography variant='h3' style={{ 'marginBottom': '1em' }}>Join Guilds</Typography>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto' }}>Browse Guilds</Button>
                    <div>
                        <div style={{display:'flex',marginTop:'2em'}}>
                            <img src={Person1} alt="personimg" style={{ width: '30%' }} />
                            <Typography style={{ fontStyle: 'italic' }}>"Guilds allow you to share advice, engage in conversations and have a group of like-minded friends you can play with!"</Typography>
                        </div>
                    </div>
                </div>
                <img src={ChessBoard} alt="chessboard" style={{ width: '20vw', height: '20%' }} />
            </div>
            {/*news section  */}
            <div className='black' style={{ display: 'flex', width:'60vw', marginTop: '5em', justifyContent: 'space-around', padding: '5em' }}>
                <img src={ChessBoard} alt="chessboard" style={{ width: '20vw', height: '20%' }} />
                <div style={{ width: '50%' }}>
                    <Typography variant='h3' style={{ 'marginBottom': '1em',float:'right' }}>Read Chess News</Typography>
                    <Button variant="contained" className='green' style={{ height: '20%', width: '70%', margin: 'auto',float:'right' }}>Chat now</Button>
                    <div>
                        <div style={{display:'flex',marginTop:'2em',float:'right'}}>
                            <img src={Person1} alt="personimg" style={{ width: '30%',float:'right' }} />
                            <Typography style={{ fontStyle: 'italic',float:'right' }}>"News helps players stay upto date with the latest developments in chess!"</Typography>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </>
}

export default Landing;