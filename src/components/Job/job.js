import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearchAlt2} from 'react-icons/bi'
import FilterGroup from '../FilterGroup/filter'
import './job.css'

class Job extends Component {
  state = {
    /*
    fulltime: '',
    parttime: '',
    freelance: '',
    internship: '',
    */
    employmentType: [],
    salaryPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {employmentType, salaryPackage, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryPackage}&search=${search}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  header = () => {
    console.log('header')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div>
          <h1>Home</h1>
          <h1>Jobs</h1>
        </div>
        <button type="button" onClick={this.onClickLogOut}>
          Logout
        </button>
      </div>
    )
  }

  sendLabel = label => {
    console.log(label)
    /*
    switch (label) {
      case 'FULLTIME':
        return this.setState({fulltime: 'FULLTIME'}, this.getJobDetails)
      case 'PARTTIME':
        return this.setState({parttime: 'PARTTIME'}, this.getJobDetails)
      case 'FREELANCER':
        return this.setState({freelancer: 'FREELANCE'}, this.getJobDetails)
      case 'INTERNSHIP':
        return this.setState({internship: 'INTERNSHIP'}, this.getJobDetails)
      default:
        return null
    }
    */

    this.setState(
      prevState => ({employmentType: [...prevState.employmentType, label]}),
      this.getJobDetails,
    )
  }

  sendSalary = salary => {
    console.log(salary)
    this.setState({salaryPackage: salary}, this.getJobDetails)
  }

  render() {
    return (
      <div>
        {this.header()}
        <FilterGroup sendLabel={this.sendLabel} sendSalary={this.sendSalary} />
        <div>
          <div>
            <input type="search" />
            <BiSearchAlt2 />
          </div>
        </div>
      </div>
    )
  }
}
export default Job
