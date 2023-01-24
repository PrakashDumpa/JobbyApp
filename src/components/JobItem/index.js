import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {eachJobItem} = props
  //   console.log(eachJobItem)
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobItem

  return (
    <li className="text-light jobItem mb-3 mt-3 p-3">
      <Link to={`jobs/${id}`} className="nav-items">
        <div className="d-flex">
          <div className="companyLogo">
            <img className="w-75" src={companyLogoUrl} alt="" />
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
          <h1 className="h5 mb-2">Description</h1>
          <p className="m-0 description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
