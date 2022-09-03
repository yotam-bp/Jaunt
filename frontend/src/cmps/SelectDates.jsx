import DatePicker from 'react-datepicker'

export function SelectDates({ setDates, startDate, endDate, isMobile }) {
  return (
    <section className="select-dates-container">
      <DatePicker
        minDate={new Date()}
        onChange={dates => setDates(dates)}
        monthsShown={isMobile ? 1 : 2}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        style={{ color: "red" }}
      />
    </section>
  )
}

