import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', filtered: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddingAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    // console.log(title, date)
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarToggled: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {
            ...eachAppointment,
            isStarToggled: !eachAppointment.isStarToggled,
          }
        }
        return eachAppointment
      }),
    }))
  }

  filterStarredAppointments = () => {
    const {appointmentsList, filtered} = this.state
    this.setState({filtered: !filtered})
    const allResults = appointmentsList
    if (filtered === false) {
      const filteredResults = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarToggled === true,
      )
      this.setState({appointmentsList: filteredResults})
    } else {
      this.setState({appointmentsList: allResults})
    }
  }

  render() {
    const {appointmentsList, title, date, filtered} = this.state
    const filterClassName = filtered ? 'filtered-btn' : 'filter-btn'
    // console.log(appointmentsList)
    // console.log(filtered)
    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="top-card">
            <form
              className="appointment-card"
              onSubmit={this.onAddingAppointment}
            >
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="input">
                TITLE
              </label>
              <input
                type="text"
                className="input-style"
                id="input"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label className="label" htmlFor="inputDate">
                DATE
              </label>
              <input
                type="date"
                className="date-style"
                id="inputDate"
                value={date}
                onChange={this.onChangeDate}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="bottom-card">
            <div className="bottom-header">
              <h1 className="app-heading">Appointments</h1>
              <button
                className={filterClassName}
                type="button"
                onClick={this.filterStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
