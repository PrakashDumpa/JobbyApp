import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="d-flex flex-column vh-100">
        <Header />
        <div className="home_container">
          <div className="home_container_width col-7 ml-5">
            <h1 className="">Find The Job That Fits Your Life</h1>
            <p className="h4">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs" className="nav-items">
              <button type="button" className="btn btn-primary mt-5">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
