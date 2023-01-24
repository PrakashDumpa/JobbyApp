/* eslint-disable react/no-unknown-property */
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'

const jobsComponentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsRightSideFunction extends Component {
  state = {
    jobItemsList: [],
    jobStatus: jobsComponentStatus.initial,
    searchInput: '',
    callingEmploymentTypeList: [],
  }

  componentDidMount() {
    this.getJobItemFunction()
  }

  getJobItemFunction = async () => {
    // const {callingEmploymentList} = this.props
    this.setState({
      jobStatus: jobsComponentStatus.inProgress,
    })
    // const {searchInput, callingEmploymentTypeList} = this.state

    // const employment = callingEmploymentList.join(',')
    // console.log('employment', employment)

    // https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=

    // const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&search=${searchInput}`
    const url = 'https://apis.ccbp.in/jobs'
    console.log(url)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobItemsList: updatedJobsList,
        jobStatus: jobsComponentStatus.success,
      })
    } else {
      this.setState({jobStatus: jobsComponentStatus.failure})
    }
  }

  searchingJobsItems = event => {
    this.setState({searchInput: event.target.value})
  }

  searchButton = () => {
    this.getJobItemFunction()
  }

  searchFunction = () => {
    const {searchInput} = this.state

    return (
      <form className="form-inline">
        <div className="input-group w-50">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={searchInput}
            onChange={this.searchingJobsItems}
          />
          <div className="input-group-prepend search_box">
            <button
              type="button"
              data-testid="searchButton"
              className="input-group-text border"
            >
              <BsSearch className="search-icon " onClick={this.searchButton} />
            </button>
          </div>
        </div>
      </form>
    )
  }

  jobItemFunction = () => {
    const {jobItemsList} = this.state

    return (
      <ul className="list-unstyled">
        {jobItemsList.map(each => (
          <JobItem key={each.id} eachJobItem={each} />
        ))}
      </ul>
    )
  }

  successView = () => <div>{this.jobItemFunction()}</div>

  loadingView = () => (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retryButton = () => {
    this.setState(
      {jobStatus: jobsComponentStatus.inProgress},
      this.getJobItemFunction,
    )
  }

  failureView = () => (
    <div className="text-light w-100 d-flex flex-column justify-content-center align-items-center mt-4">
      <img
        className="w-75"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="mt-2">Oops! Something Went Wrong</h1>
      <p>We cannot seen to find the page you are looking for.</p>
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.retryButton}
      >
        Retry
      </button>
    </div>
  )

  switchFunction = () => {
    const {jobStatus} = this.state
    // console.log(jobStatus)
    switch (jobStatus) {
      case jobsComponentStatus.success:
        return this.successView()
      case jobsComponentStatus.failure:
        return this.failureView()
      case jobsComponentStatus.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  //   a = employment => {
  //     //   const {callingEmploymentList} = this.props
  //     this.setState(
  //       {callingEmploymentTypeList: employment},
  //       // this.getJobItemFunction(callingEmploymentList),
  //     )
  //   }

  render() {
    const {callingEmploymentList} = this.props
    // const {callingEmploymentTypeList} = this.state

    // if (callingEmploymentList.length === 0) {
    //   console.log('length')
    // } else {
    //   const employment = callingEmploymentList.join(',')
    //   this.getJobItemFunction(employment)
    // }

    // console.log('employment', employment)
    console.log('RightSide', callingEmploymentList)
    return (
      <div>
        {this.searchFunction()}
        <div>{this.switchFunction()}</div>
      </div>
    )
  }
}

export default JobsRightSideFunction
