import { Component } from "react";
import { withRouter } from "react-router";
import { GuestModal } from "./GuestModal";
import { utilService } from "../services/utilService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class _StayFilter extends Component {
  state = {
    filterBy: {
      location: "",
    },
    isModalShown: false,
    startDate: "",
    endDate: "",
    guestAmount: { adults: 0, children: 0, infants: 0 },
    x: 0,
    y: 0,
  };

  async componentDidMount() {
    const { isModalShown } = this.state;
    this.setState({ isModalShown: isModalShown });
  }

  componentDidUpdate(prevProps, prevState) {
  }
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { filterBy } = this.state;
    this.setState({
      filterBy: { ...filterBy, [name]: value },
      [name]: value,
      [name]: value,
    });
  };
  
  openModal = (ev) => {
    this.setState({ isModalShown: true });
  };
  
  closeModal = () => {
    this.setState({ isModalShown: false });
  };
  
  updateGuestsAmount = (typeOfGuest, diff, ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const updatedOrder = { ...this.props.order };
    updatedOrder.guestAmount[typeOfGuest] += diff;
    if (updatedOrder.guestAmount[typeOfGuest] < 0) return;
    this.props.setGuestAmount(updatedOrder);
  };
  
  setDates = (dates) => {
    const [updatedStartDate, updatedEndDate] = dates;
    this.setState({ startDate: updatedStartDate, endDate: updatedEndDate });
    const updatedOrder = { ...this.props.order };
    updatedOrder.startDate = updatedStartDate;
    updatedOrder.endDate = updatedEndDate;
    this.props.setDates(updatedOrder);
  };
  
  setLocation = (location) => {
    const updatedOrder = { ...this.props.order };
    updatedOrder.location = location;
    if (location !== this.state.filterBy) {
      console.log("hello");
    }
    this.props.setLocation(updatedOrder);
    this.props.history.push(`/stay?loc=${location}`);
  };
  
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { location } = this.state.filterBy;
    this.setLocation(location);
  };

  render() {
    const { guestAmount, location } = this.props.order;
    const { startDate, endDate, isModalShown, x, y, filterBy } = this.state;
    const style = {
      backgroundPosition: `calc((100 - ${x}) * 1%) calc((100 - ${y}) * 1%)`,
    };
    return (
      <form className="stay-filter flex justify-center align-center" onSubmit={this.handleSubmit}>
        <div className="flex column justify-center">
          <i className="fas fa-map-marked-alt fs24"></i>
          <div className="location">
            <label className="label fs12" htmlFor="location">
              Location
            </label>
            <input
            required={true}
              type="text"
              name="location"
              id="location"
              placeholder={location ? location : "Where are you going?"}
              value={filterBy.location}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="tiny-border"></div>
        <i className="far fa-calendar-alt fs24"></i>
        <div className="date-picker flex column justify-center">
          <span className="label fs12">Dates</span>
          <DatePicker
            placeholderText={
              this.props.order.startDate && this.props.order.endDate
                ? utilService.formatTime(this.props.order.startDate) +
                  "-" +
                  utilService.formatTime(this.props.order.endDate)
                : "Choose dates"
            }
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => this.setDates(date)}
            monthsShown={2}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            selectsRange
            shouldCloseOnSelect={true}
          />
        </div>
        <div className="tiny-border"></div>
        <i className="fas fa-user-plus fs24"></i>
        <div
          className="guests flex column justify-center"
          onClick={(ev) => this.openModal()}
        >
          <label className="label fs12" htmlFor="guestAmount">
            Guests
          </label>
          {guestAmount.adults + guestAmount.children + guestAmount.infants <=
          0 ? (
            <span className="add-guests fs14">Add guests</span>
          ) : (
            <span className="add-guests fs14">
              {guestAmount.adults + guestAmount.children + guestAmount.infants}{" "}
              guests
            </span>
          )}
          <div className="guest-modal">
            <GuestModal
              isModalShown={isModalShown}
              guestAmount={guestAmount}
              updateGuestsAmount={this.updateGuestsAmount}
              closeModal={this.closeModal}
              openModal={this.openModal}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
        <button
        type="submit"
        value="Submit"
          onMouseMove={this.handleMouseMove}
          className="search-btn flex align-center justify-center"
        //   onClick={this.onSubmit}
          style={style}
        >
          <i className="fas fa-search search-icon"></i>
        </button>
      </form>
    );
  }
}
export const StayFilter = withRouter(_StayFilter);
