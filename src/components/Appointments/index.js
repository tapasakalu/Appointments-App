import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFiltereActive: false,
  }

  onChangeInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  toogleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFiltereActive} = this.state

    this.setState({isFiltereActive: !isFiltereActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidV4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFiltereActive} = this.state

    if (isFiltereActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFiltereActive} = this.state
    const filterClassName = isFiltereActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="main-container">
        <div className="app-container">
          <div className="appointment-container">
            <div className="form-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="input"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeInput}
                  placeholder="Title"
                />
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDate}
                  placeholder="Date"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="line" />
            <div className="header-filter-container">
              <h1 className="appointment-list-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filterAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toogleStarred={this.toogleStarred}
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
