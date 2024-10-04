import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export default function Footer(props) {
  const { handleToggleModal, setSelectedDate, data, selectedDate } = props
  const [startDate, setStartDate] = useState(selectedDate || new Date());

  return (
    <footer>
      <div className='bgGradient'></div>
      <div>
        <h1>NASA's Astronomy Picture of the Day</h1>
        <h2>{data?.title}</h2>
        <label>Select Date: </label>
        <DatePicker
          id='date-picker'
          selected={startDate}
          onChange={(date) => {
            setStartDate(date)
            setSelectedDate(date)
          }}
          maxDate={new Date()}
          dateFormat='yyyy-MM-dd'
        />
      </div>
      <div className='button-group'>
        <button onClick={handleToggleModal}>
          <i className='fa-solid fa-circle-info'></i>
        </button>
      </div>
    </footer>
  )
}