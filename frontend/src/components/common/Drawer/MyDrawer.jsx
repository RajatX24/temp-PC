import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logo from "../../../assets/logo.png"
import PawnIcon from "../../../assets/Sidebar/pawn.png"
import BlogIcon from "../../../assets/Sidebar/blog.png"
import ChatIcon from "../../../assets/Sidebar/chat.png"
import NewsIcon from "../../../assets/Sidebar/newspaper.png"
import GuildIcon from "../../../assets/Sidebar/guilds.png"
import LogoutIcon from "../../../assets/Sidebar/logout.png"
import '../../../colors.css'
import './MyDrawer.css'
import { useNavigate } from 'react-router-dom';


export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const path = ['/play', '/chat', '/blog', '/guild', 'news', '/signin']
  return (
    <Drawer
      sx={{
        overflow: 'hidden',
        width: '14vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '14vw',
          boxSizing: 'border-box',
          backgroundColor: '#262522'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        <ListItem key={'Logo'} disablePadding>
          <ListItemButton onClick={() => { navigate('/') }}>
            <ListItemIcon style={{ width: '100%' }}>
              <img src={Logo} alt="Project Chess" style={{ width: '95%', paddingTop: '1em', paddingBottom: '1em' }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {['Play', 'Chats', 'Blogs', 'Guilds', 'News'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { navigate(path[index]) }}>
              <ListItemIcon style={{ width: '50%' }}>
                {
                  index == 0 ? <img src={PawnIcon} alt="pawn icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} /> :
                    index == 1 ? <img src={ChatIcon} alt="chat icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} /> :
                      index == 2 ? <img src={BlogIcon} alt="blog icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} /> :
                        index == 3 ? <img src={GuildIcon} alt="guild icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} /> :
                          <img src={NewsIcon} alt="news icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} />

                }
              </ListItemIcon>
              <ListItemText className='icon-label' primary={text} />
            </ListItemButton>
          </ListItem>

        ))}
        <ListItem key={'SignOut'} disablePadding>
          <ListItemButton onClick={() => {
            confirm('Confirm Logout?') ?(alert('ran'),localStorage.setItem('token', ''),navigate('/')): null}}>
            <ListItemIcon style={{ width: '50%' }}>
              <img src={LogoutIcon} alt="logout icon" style={{ width: '50%', paddingTop: '1em', paddingBottom: '1em' }} />
            </ListItemIcon>
            <ListItemText className='icon-label' primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  );
}
