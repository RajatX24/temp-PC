import PermanentDrawerLeft from "../components/common/Drawer/MyDrawer.jsx"
import Footer from "../components/common/Footer/Footer.jsx"
import '../App.css'
import '../colors.css'
import { Outlet } from "react-router-dom"

function LoggedInApp() {

  return (
      <div style={{ display: 'flex' }}>
        <PermanentDrawerLeft />
        <div style={{ paddingLeft: '5em' }}>
          <Outlet/>
          <Footer />
        </div>
      </div>
  )
}

export default LoggedInApp;