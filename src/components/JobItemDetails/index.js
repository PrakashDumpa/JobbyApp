/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import {RiShareForward2Line} from 'react-icons/ri'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    updatedJobDetails: [],
    updatedSimilarJobDetails: [],
    status: componentStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({status: componentStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: [
          {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        ],
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
      }
      const updatedSimilarJobDetails = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      //   console.log('data', updatedSimilarJobDetails)
      this.setState({
        updatedJobDetails,
        updatedSimilarJobDetails,
        status: componentStatus.success,
      })
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  skillsFunction = () => {
    const {updatedJobDetails} = this.state
    const {skills} = updatedJobDetails
    if (skills === undefined) {
      return null
    }

    return (
      <ul className="list-unstyled skills_container">
        {skills.map(each => (
          <li
            key={uuidv4()}
            className="col-4 d-flex justify-content-start align-items-center mb-4"
          >
            <img src={each.imageUrl} alt={each.name} className="w-25" />
            <p className="m-0 ml-3">{each.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  lifeAtCompanyFunction = () => {
    const {updatedJobDetails} = this.state
    const {lifeAtCompany} = updatedJobDetails
    // console.log('lifeAtCompany', lifeAtCompany)

    if (lifeAtCompany === undefined) {
      return null
    }
    return (
      <div className="d-flex align-items-center">
        {lifeAtCompany.map(each => (
          <div key={uuidv4()} className="d-flex align-items-center">
            <p className="col-9">{each.description}</p>
            <img src={each.imageUrl} alt="life at company" className="col-3" />
          </div>
        ))}
      </div>
    )
  }

  similarJobsFunction = () => {
    const {updatedSimilarJobDetails} = this.state

    return (
      <div className="similar_jobs_container_width">
        <ul className="list-unstyled similarItems">
          {updatedSimilarJobDetails.map(each => (
            <li key={each.id} className=" col-4">
              <div className="text-light jobItem  mb-3 mt-3 p-4">
                <div className="d-flex">
                  <div className="companyLogo">
                    <img
                      className="w-75"
                      src={each.companyLogoUrl}
                      alt="similar job company logo"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-between">
                    <h1 className="h4 m-0">{each.title}</h1>
                    <div className="d-flex m-0">
                      <BsFillStarFill className="star mr-2" />
                      <p className="m-0">{each.rating}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="h4 mb-2 mt-3">Description</h1>
                  <p className="m-0 description">{each.jobDescription}</p>
                </div>

                <div className="mt-3 d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="d-flex mr-4">
                      <MdLocationOn className="h3 mr-1" />
                      <p className="m-0">{each.location}</p>
                    </div>
                    <div className="d-flex">
                      <CgToolbox className="h3 mr-1" />
                      <p className="m-0 ">{each.employmentType}</p>
                    </div>
                  </div>
                  <p className="m-0 h5">{each.packagePerAnnum}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  successView = () => {
    const {updatedJobDetails} = this.state
    // console.log(updatedSimilarJobDetails)
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      //   id,
    } = updatedJobDetails

    return (
      <div>
        <Header />
        <div className="jobs_container">
          <div className="jobs_container_width mt-5">
            <div className="text-light jobItem mb-3 mt-3 p-4">
              <div className="d-flex">
                <div className="companyLogo">
                  <img
                    className="w-75"
                    src={companyLogoUrl}
                    alt="job details company logo"
                  />
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <h1 className="h4 m-0">{title}</h1>
                  <div className="d-flex m-0">
                    <BsFillStarFill className="star mr-2" />
                    <p className="m-0">{rating}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-between">
                <div className="d-flex">
                  <div className="d-flex mr-4">
                    <MdLocationOn className="h3 mr-1" />
                    <p className="m-0">{location}</p>
                  </div>
                  <div className="d-flex">
                    <CgToolbox className="h3 mr-1" />
                    <p className="m-0">{employmentType}</p>
                  </div>
                </div>
                <p className="m-0 h5">{packagePerAnnum}</p>
              </div>
              <hr />

              <div>
                <div className="d-flex justify-content-between">
                  <h1 className="h4 mb-2">Description</h1>
                  <a href={companyWebsiteUrl} className="d-flex">
                    <div className="d-flex text-primary">
                      <p className="h6 pr-2">Visit</p>
                      <RiShareForward2Line className="h6" />
                    </div>
                  </a>
                </div>
                <p className="m-0 description">{jobDescription}</p>
              </div>

              <div>
                <h1 className="h4 mt-4 mb-3">Skills</h1>
                {this.skillsFunction()}
              </div>

              <div>
                <h1 className="h4">Life at Company</h1>
                {this.lifeAtCompanyFunction()}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-light h3 ml-5 mt-4">Similar Jobs</h1>
            <div className="d-flex justify-content-center">
              {this.similarJobsFunction()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retryButton = () => {
    this.setState({status: componentStatus.inProgress}, this.getJobItemDetails)
  }

  failureView = () => (
    <div>
      <Header />
      <div className="jobs_container">
        <div className="text-light w-100 d-flex flex-column justify-content-center align-items-center mt-4 mb-5">
          <img
            className="w-50"
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
      </div>
    </div>
  )

  switchFunction = () => {
    const {status} = this.state
    switch (status) {
      case componentStatus.success:
        return this.successView()
      case componentStatus.failure:
        return this.failureView()
      case componentStatus.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.switchFunction()}</div>
  }
}

export default JobItemDetails
