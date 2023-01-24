import {Component} from 'react'
import './index.css'
import UserProfile from '../UserProfile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

let lst = []
class JobsLeftSideSection extends Component {
  state = {employmentType: [], minimumPackage: ''}

  onChangeEmploymentType = event => {
    const {callingEmploymentFilter} = this.props
    if (event.target.checked) {
      lst.push(event.target.id)
      this.setState({employmentType: [...lst]})
    } else {
      //   lst.remove(event.target.value)
      lst = lst.filter(each => each !== event.target.id)
      this.setState({employmentType: [...lst]})
    }
    callingEmploymentFilter(lst)
  }

  employmentFilterFunction = () => {
    const {employmentType} = this.state
    // console.log(employmentType)
    return (
      <div>
        <h1 className="h5 text-light pb-3">Type of Employment</h1>
        <ul className="list-unstyled d-flex flex-column">
          {employmentTypesList.map(each => (
            <li
              key={each.employmentTypeId}
              className="form-check form-check-inline m-2"
            >
              <input
                type="checkbox"
                // checked
                id={each.employmentTypeId}
                className="pr-2 form-check-input check"
                name="employment"
                value={each.label}
                onChange={this.onChangeEmploymentType}
              />
              <label
                htmlFor={each.employmentTypeId}
                className="text-light m-0 form-check-label check"
              >
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  salaryRangeFilterFunction = () => {
    const {minimumPackage} = this.state
    return (
      <div>
        <h1 className="h5 text-light pb-3">Salary Range</h1>
        <ul className="list-unstyled">
          {salaryRangesList.map(each => (
            <li
              key={each.salaryRangeId}
              className="m-2 form-check form-check-inline"
            >
              <input
                type="radio"
                id={each.salaryRangeId}
                className="mr-2 form-check-input"
                name="salary"
                value={each.label}
              />
              <label
                htmlFor={each.salaryRangeId}
                className="text-light form-check-label"
              >
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {employmentType} = this.state
    console.log(employmentType)
    return (
      <div>
        <UserProfile />
        <hr />
        {this.employmentFilterFunction()}
        <hr />
        {this.salaryRangeFilterFunction()}
      </div>
    )
  }
}

export default JobsLeftSideSection
