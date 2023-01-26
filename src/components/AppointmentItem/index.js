import {format} from 'date-fns'
import './index.css'

// console.log(format(new Date(2021, 19, 07), 'dd MMMM yyyy, EEEE')) // 19 July 2021, Monday
const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props
  const {title, date, id, isStarToggled} = appointmentDetails
  const onClickStar = () => {
    onToggleStar(id)
  }
  const imgSrc = isStarToggled
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="title-star">
        <p className="heading-card">{title}</p>
        <button
          className="star"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={imgSrc} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </li>
  )
}
export default AppointmentItem
