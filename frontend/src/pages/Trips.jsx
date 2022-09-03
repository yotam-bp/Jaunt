import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../cmps/Header.jsx";
import { loadUser } from "../store/actions/userActions";
import trips from "../assets/img/trips.jpg";

class _Trips extends Component {

  async componentDidMount() {
     await this.props.loadUser(this.props.loggedInUser._id);
  }

  render() {
    const { orders } = this.props.loggedInUser;
    if (!orders) return <div>No orders yet!</div>;
    return (
      <section className="trips-page">
        <Header />
        <h2>Trips</h2>
        <div className="divider"></div>
        <div className="orders-container grid">
          {orders.map((order, idx) => (
            <article className="flex column" key={idx}>
              <img src={order.stay.imgUrls[0]} alt="stay" />
              <section className="order-details">
                {/* <div className="dates fs16">{utilService.formatTime(order.startDate)} - {utilService.formatTime(order.endDate)}</div> */}
                <h2 className="country fs26">{order.stay.country}</h2>
                <div className="divider"></div>
                <div className="fs14 description flex space-between align-center">
                  <div className="img-container flex">
                    <img src={order.stay.imgUrls[0]} alt="stay" />
                  </div>
                  <div className="flex">{order.stay.name}</div>
                  <span className="arrow flex  fs30">›</span>
                </div>
              </section>
            </article>
          ))}
        </div>
        <img src={trips} alt="trips" style={orders.length === 0 ? {padding : "10% 0"} : {padding: "0"}} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.userModule.orders,
    loggedInUser: state.userModule.loggedInUser,
  };
};
const mapDispatchToProps = {
  loadUser,
};

export const Trips = connect(mapStateToProps, mapDispatchToProps)(_Trips);
