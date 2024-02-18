import React from 'react'
import { Typography, Button, TextField } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate=useNavigate();
    const [usr, setUsr] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    return <>
        <div style={{ margin: 'auto', width: '30vw', display: 'flex', flexDirection: 'column', marginTop: '30vh'}}>
            <Typography variant="h3" style={{width:'25%', margin:'auto',marginBottom:'2vh'}}>
                Login
            </Typography>
            <input type="text" id="usr" placeholder='username' style={{border:'white', height:'3em',marginBottom:'2vh',backgroundColor:'#262522',paddingLeft:'2em'}} onChange={(e) => setUsr(e.target.value)} />
            <input type="password" id="pwd" placeholder='password' style={{border:'white', height:'3em',marginBottom:'2vh',backgroundColor:'#262522',paddingLeft:'2em'}} onChange={(e) => setPwd(e.target.value)} />
            <Button variant="contained" onClick={() => {
                console.log(usr);
                console.log(pwd);
                //https://blog-app-three-woad.vercel.app/
                //http://localhost:3000/admin/login
                const url=import.meta.env.VITE_SERVER_URL+`/admin/login`;
                axios.post(url, {
                    username: usr,
                    password: pwd,
                })
                    .then(function (response) {
                        console.log(response);
                        localStorage.setItem('token', response.data.token);
                        console.log('Setting token to -' + response.data.token);
                        navigate("/play");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            }>Login</Button>

        </div>
    </>
}

export default LoginPage;