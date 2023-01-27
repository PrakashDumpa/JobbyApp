import {Component} from 'react'
import './index.css'
/* eslint-disable react/no-unknown-property */
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import Header from '../Header'
import JobsLeftSideSection from '../JobsLeftSideSection'

const jobsComponentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobItemsList: [],
    jobStatus: jobsComponentStatus.initial,
    searchInput: '',
    employmentTypeList: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobItemFunction()
  }

  getJobItemFunction = async () => {
    this.setState({
      jobStatus: jobsComponentStatus.inProgress,
    })
    const {searchInput, employmentTypeList, salaryRange} = this.state

    const employmentTypeListInString = employmentTypeList.join(',')
    // console.log(employmentTypeListInString)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeListInString}&minimum_package=${salaryRange}&search=${searchInput}`

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
              onClick={this.searchButton}
              testid="searchButton"
              className="input-group-text border"
            >
              <BsSearch className="search-icon " />
            </button>
          </div>
        </div>
      </form>
    )
  }

  jobItemFunction = () => {
    const {jobItemsList} = this.state
    if (jobItemsList.length === 0) {
      return (
        <div className="text-light d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="text-center">
            <img
              className="w-75"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
          </div>
          <h1 className="mt-3">No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

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
      <p>We cannot seem to find the page you are looking for</p>
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

  jobsRightSideFunction = () => (
    <div>
      {this.searchFunction()}
      <div>{this.switchFunction()}</div>
    </div>
  )

  addEmploymentType = employmentTypeList => {
    this.setState({employmentTypeList}, this.getJobItemFunction)
  }

  changeSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getJobItemFunction)
  }

  clearAllFilters = () => {
    this.setState(
      {employmentTypeList: [], salaryRange: 0},
      this.getJobItemFunction,
    )
  }

  render() {
    const {employmentTypeList, salaryRange} = this.state
    return (
      <div className="d-flex flex-column">
        <Header />
        <div className="jobs_container">
          <div className="jobs_container_width mt-5">
            <div className="col-3">
              <JobsLeftSideSection
                addEmploymentType={this.addEmploymentType}
                changeSalaryRange={this.changeSalaryRange}
                clearAllFilters={this.clearAllFilters}
                employmentTypeList={employmentTypeList}
                salaryRange={salaryRange}
              />
            </div>
            <div className="col-9 ">{this.jobsRightSideFunction()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
