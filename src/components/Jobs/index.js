import {Component} from 'react'
import './index.css'
import Header from '../Header'
import JobsLeftSideSection from '../JobsLeftSideSection'
import JobsRightSideFunction from '../JobsRightSideFunction'

class Jobs extends Component {
  state = {callingEmploymentList: []}

  callingEmploymentFilter = lst => {
    console.log('callingList', lst)
    this.setState({callingEmploymentList: lst})
  }

  render() {
    const {callingEmploymentList} = this.state
    return (
      <div className="d-flex flex-column">
        <Header />
        <div className="jobs_container">
          <div className="jobs_container_width mt-5">
            <div className="col-3">
              <JobsLeftSideSection
                callingEmploymentFilter={this.callingEmploymentFilter}
              />
            </div>
            <div className="col-9 ">
              <JobsRightSideFunction
                callingEmploymentList={callingEmploymentList}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
