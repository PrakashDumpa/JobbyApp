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
          <Link to="/">
            <img
              className="w-75 text-center"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="d-flex col-3 list-unstyled">
          <li>
            <Link to="/" className="nav-items">
              <p className="m-0 mr-3 h5">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-items">
              <p className="m-0 h5">Jobs</p>
            </Link>
          </li>
          <li>.</li>
        </ul>
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
