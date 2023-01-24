import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutFunction = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
    // console.log('logout')
  }

  return (
    <div className="nav_width p-3 text-light">
      <nav className="nav-container">
        <div className="col-2">
          <img
            className="w-75 text-center"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="d-flex col-3 ">
          <Link to="/" className="nav-items">
            <p className="m-0 mr-3 h5">Home</p>
          </Link>
          <Link to="/jobs" className="nav-items">
            <p className="m-0 h5">Jobs</p>
          </Link>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={logoutFunction}
        >
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
