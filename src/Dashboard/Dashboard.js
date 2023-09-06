import './dashboard.scss'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpg'
export const Dashboard = () => {
const navigate = useNavigate()
  return (
    <div class="wrapper">

      <nav className='nav'>

        {/* <header>
          <span></span>
          Admin
        </header> */}
       
        <ul >
          <img
          src={logo}
          style={{
            height: "10vh",
            width: "5vw",
            marginLeft:10
          }}
        />
          <li style={{
            display:'flex',
            alignSelf:'flex-start',
          }}>

            <Link to={"/dashboard/tx"}>
              Dashboard
            </Link>
          </li>
          <li style={{
            display:'flex',
            alignSelf:'flex-start'
          }}>

            <Link to={"/dashboard/completed"}>
              Completed
            </Link>
          </li>
 <li style={{
            display:'flex',
            alignSelf:'flex-start'
          }}>

            <Link to={"/dashboard/pending"}>
              Pending
            </Link>
          </li>
          <li style={{
            display:'flex',
            alignSelf:'flex-start'
          }} onClick={()=>{
            localStorage.removeItem('rupexToken')
            navigate('/login')
          }}><a>Logout</a></li>
        </ul>

      </nav>

      {/* <main>

  <h1>Flexbox Admin Template</h1>

  <div class="flex-grid">
    <div>
      <h2>Clean CSS Code</h2>
      <ul>
        <li>no position: absolute</li>
        <li>no float</li>
        <li>no clearfix</li>
        <li>no faux columns</li>
        <li>no javascript</li>
      </ul>
    </div>
    <div>
      <h2>Font Awesome</h2>
      <ul>
        <li>no images</li>
        <li>no extra retina sprites</li>
      </ul>
    </div>
    <div>
      <h2>SCSS</h2>
      <ul>
        <li>no headache :)</li>
      </ul>
    </div>
  </div>

  <div class="flex-grid">
    <div>
      <h2>Headline</h2>
      Some Content
    </div>
    <div>
      <h2>Headline</h2>
      Some Content
    </div>
  </div>

  <div class="flex-grid">
    <div>
      <h2>Headline</h2>
      Some Content
    </div>
  </div>

</main> */}
      <div id='detail' style={{ backgroundColor: '#F5EEE6' }}>
        <Outlet />
      </div>
    </div>
  )
}