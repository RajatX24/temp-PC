// import './App.css'
import './colors.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material";
import theme from './theme/theme.js'
import LoginPage from './pages/LoginPage/LoginPage';
import LoggedInApp from './pages/LoggedInApp';

import Chat from './pages/Chat.jsx'
import Guild from './pages/Guild.jsx'
import Home from './pages/Home.jsx'
import News from './pages/News.jsx'
import Play from './pages/Play.jsx'
import Landing from './pages/Landing.jsx'

import BlogPageContainer from "./pages/Blog/BlogPageContainer.jsx";
import BlogHomepage from "./pages/Blog/BlogHomePage.jsx";
import CreateNewBlogPage from "./pages/Blog/CreateNewBlogPage.jsx";
import EditBlogPage from "./pages/Blog/EditBlogPage.jsx";
import ReadBlogPage from "./pages/Blog/ReadBlogPage.jsx";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/' element={<LoggedInApp />}>
            <Route path='/landing' element={<Landing/>} />
            <Route path='/blog' element={<BlogPageContainer/>} />
            <Route path='/blog/newBlog' element={<CreateNewBlogPage />} />
            <Route path='/blog/editBlog/:blogId' element={<EditBlogPage />} />
            <Route path='/blog/readBlog/:blogId' element={<ReadBlogPage />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/guild' element={<Guild />} />
            <Route path='/home' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path='/play' element={<Play />} />
          </Route>
        </Routes>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"></script>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App