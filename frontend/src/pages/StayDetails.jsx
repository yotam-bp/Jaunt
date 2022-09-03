import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "../cmps/NavBar";
import { StayMap } from "../cmps/StayMap";
import { SelectDates } from "../cmps/SelectDates";
import { Amenities } from "../cmps/Amenities";
import { Reviews } from "../cmps/Reviews";
import { StayMainInfo } from "../cmps/StayMainInfo.jsx";
import { setStay } from "../store/actions/stayActions";
import {
  setLocation,
  setDates,
  setGuestAmount,
} from "../store/actions/orderActions";
import {
  addOrder,
  addToWish,
  removeFromWish,
  loadUser
} from "../store/actions/userActions";
import { CheckAvailability } from "../cmps/CheckAvailability";
import { StayDesc } from "../cmps/StayDesc";
import Alert from "../cmps/Alert";
import { socketService } from "../services/socketService";

class _StayDetails extends Component {
  state = {
    isMobile: false,
    isSecondClick: false,
    startDate: "",
    endDate: "",
    isModalShown: false,
    isChargeShown: false,
    x: 0,
    y: 0,
  };

  async componentDidMount() {
    if (this.props.loggedInUser) {
      await this.props.loadUser(this.props.loggedInUser._id);
    }
    await this.props.setStay(this.props.match.params.id);
    socketService.emit("topic", this.props.stay.host._id);
    if (window.innerWidth < 769) {
      const isMobile = true;
      this.setState({ isMobile });
    }
  }
  
//   isOnWishlist = () => this.props.loggedInUser.wishlist.find(
//    (saved) => saved._id === stay._id
//  );

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  componentWillUnmount() {
    socketService.off("topic");
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { filterBy } = this.state;
    this.setState({
      filterBy: { ...filterBy, [name]: value },
      [name]: value,
      [name]: value,
    });
  };

  getAmenitiesIcons = (txt) => {
    switch (txt) {
      case "TV":
        return "fa fa-tv";
      case "Wifi":
        return "fa fa-wifi";
      case "Kitchen":
        return "fa fa-cutlery";
      case "Smoking allowed":
        return "fas fa-smoking";
      case "Pets allowed":
        return "fas fa-paw";
      case "Parking":
        return "fas fa-parking";
      case "Room service":
        return "fas fa-concierge-bell";
      case "Transportation":
        return "fas fa-bus";
      case "Refrigerator":
        return "fas fa-refrigerator";
      case "Coffee":
        return "fas fa-coffee";
      case "Air conditioning":
        return "fas fa-snowflake";
      case "Bathtub":
        return "fas fa-bath";
      case "Backyard":
        return "fas fa-leaf";
      default:
    }
  };

  openModal = () => {
    // const { isModalShown } = this.state
    this.setState({ isModalShown: true });
  };

  closeModal = () => {
    // const { isModalShown } = this.state
    this.setState({ isModalShown: false });
  };

  changeBtn = () => {
    const { isChargeShown, isSecondClick, x, y } = this.state;
    const style = {
      backgroundPosition: `calc((100 - ${x}) * 1%) calc((100 - ${y}) * 1%)`,
    };
    if (!isChargeShown && !isSecondClick) {
      return (
        <button
          className="check-btn fs16"
          onMouseMove={this.handleMouseMove}
          style={style}
          onClick={(ev) => this.toggleCharge(ev)}
        >
          Check Availability
        </button>
      );
    }
    if (isChargeShown && !isSecondClick) {
      return (
        <button
          className="check-btn fs16"
          onMouseMove={this.handleMouseMove}
          style={style}
          onClick={this.toggleCharge}
        >
          Reserve
        </button>
      );
    } else if (!isChargeShown && isSecondClick) {
      return <span className="reserved-btn fs16">Reserved</span>;
    }
  };

  toggleCharge = (ev) => {
    ev.preventDefault();
    if (this.props.loggedInUser === null) {
      alert("Log-in first please!");
      return;
    }
    const { isChargeShown, isSecondClick } = this.state;
    const { fullName, img, username, _id } = this.props.loggedInUser;
    const { address, country } = this.props.stay.loc;
    const { host, imgUrls, name } = this.props.stay;
    const updatedOrder = { ...this.props.order };
    if (!isChargeShown && !isSecondClick) {
      this.setState({ isChargeShown: true });
      return;
    }
    updatedOrder.location = address;
    updatedOrder.stay = { name, imgUrls, country };
    updatedOrder.guest = { fullName, img, username, _id };
    this.props.setLocation(updatedOrder);
    this.props.addOrder(updatedOrder, host._id, _id);
    this.setState({ isSecondClick: true, isChargeShown: false });
  };

  getGuestsNum = () => {
    const { adults, children, infants } = this.props.order.guestAmount;
    return adults + children + infants;
  };

  setDates = (dates) => {
    const [updatedStartDate, updatedEndDate] = dates;
    this.setState({ startDate: updatedStartDate, endDate: updatedEndDate });
    const updatedOrder = { ...this.props.order };
    updatedOrder.startDate = updatedStartDate;
    updatedOrder.endDate = updatedEndDate;
    this.props.setDates(updatedOrder);
  };

  updateGuestsAmount = (typeOfGuest, diff, ev) => {
    // need to handle case when num is < 0
    ev.stopPropagation();
    ev.preventDefault();
    const updatedOrder = { ...this.props.order };
    updatedOrder.guestAmount[typeOfGuest] += diff;
    this.props.setGuestAmount(updatedOrder);
  };

  getTotalDays = (end, start) => {
    if (!end || !start) return;
    const diff = end.getTime() - start.getTime();
    const totalDays = diff / (1000 * 60 * 60 * 24);
    return totalDays;
  };

  render() {
    const { stay, order, setLocation } = this.props;
    const { isMobile, startDate, endDate, isSecondClick } = this.state;
    if (!stay) return <div>loading</div>;
    // else if (stay && isMobile) return <div>loading</div>
    return (
      <section className="stay-details-container ">
        <NavBar
          order={order}
          setLocation={setLocation}
          setGuestAmount={this.props.setGuestAmount}
          setDates={this.props.setDates}
          startDate={startDate}
          endDate={endDate}
        />
        <section className="desc-page">
          <StayMainInfo stay={stay} />
          <section className="description flex">
            <div className="stay-description">
              <StayDesc stay={stay} />
              <div className="divider"></div>
              <section className="details-container">
                <h2>Amenities</h2>
                <Amenities
                  amenities={stay.amenities}
                  getAmenitiesIcons={this.getAmenitiesIcons}
                />
              </section>
              <div className="divider"></div>
              <section className="details-container">
                <h2>Select dates</h2>
                <SelectDates
                  startDate={startDate}
                  endDate={endDate}
                  setDates={this.setDates}
                  isMobile={isMobile}
                />
              </section>
            </div>
            {isSecondClick && (
              <Alert text={"Order has booked successfully, check it on trips page!"} severity={"success"}/>
            )}
            <CheckAvailability
              state={this.state}
              props={this.props}
              getGuestsNum={this.getGuestsNum}
              openModal={this.openModal}
              closeModal={this.closeModal}
              toggleCharge={this.toggleCharge}
              updateGuestsAmount={this.updateGuestsAmount}
              handleMouseMove={this.handleMouseMove}
              setDates={this.setDates}
              changeBtn={this.changeBtn}
              getTotalDays={this.getTotalDays}
              isMobile={isMobile}
            />
          </section>
          <div className="divider"></div>
          <Reviews reviews={stay.reviews} isMobile={isMobile} />
          <div className="divider"></div>
          <StayMap stay={stay} isMobile={isMobile} />
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stay: state.stayModule.currStay,
    order: state.orderModule.currOrder,
    orders: state.userModule.orders,
    loggedInUser: state.userModule.loggedInUser,
  };
};
const mapDispatchToProps = {
  setStay,
  setLocation,
  setDates,
  setGuestAmount,
  addOrder,
  addToWish,
  removeFromWish,
  loadUser
};

export const StayDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StayDetails);


