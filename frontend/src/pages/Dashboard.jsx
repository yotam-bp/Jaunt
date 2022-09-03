import React, { Component } from "react";
import { connect } from "react-redux";
// import Alert from '../cmps/Alert'
import { Header } from "../cmps/Header";
import dashboard from "../assets/img/dashboard.png";
import { socketService } from "../services/socketService";
import { loadUser } from "../store/actions/userActions";

class _Dashboard extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.loggedInUser._id);
    socketService.emit("topic", this.props.loggedInUser._id);
    socketService.on("load orders", () =>
      this.props.loadUser(this.props.loggedInUser._id)
    );
  }

  componentWillUnmount() {
    socketService.off("load orders");
  }

  accepteOrder() {
    console.log("accepted");
  }

  rejectOrder() {
    console.log("rejected");
  }

  render() {
    const { incomingOrders } = this.props.loggedInUser;
    return (
      <section className="dashboard-page">
        <Header />
        <h2>Pending / Accepted</h2>
        <section className="host-container flex">
          <section className="all-reservations flex column">
            <div className="new-reservations">
              {incomingOrders.map((order, idx) => (
                <div className="res-card flex" key={idx}>
                  <div className="res-img">
                    <img src={order.guest.img} alt={order.stay.name} />{" "}
                  </div>
                  <div className="txt">
                    <div className="name">
                      Request by: {order.guest.fullName}
                    </div>
                    <div className="expire">Expires in 12 hours</div>
                    <div className="desc flex column">
                      {order.guestAmount.adults} guests ·
                      {order.startDate.slice(0, 10)} -{" "}
                      {order.endDate.slice(0, 10)} ·{order.stay.name}
                    </div>
                  </div>
                  <div className="order-status-container flex space-between">
                    <div
                      className="status accept-btn"
                      onClick={() => this.accepteOrder()}
                    >
                      Accept
                    </div>
                    <div
                      className="status reject-btn flex"
                      onClick={() => this.rejectOrder()}
                    >
                      Reject
                    </div>
                    {/* <Alert text="Order accepted" /> */}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="summary">
            <h2 className="title">Hosting summary</h2>
            <div className="details flex space-between">
              <div className="txt">
                <p className="head">Fantastic job!</p>
                <div className="main">
                  <p>Guests love what you're doing.</p>
                  <p>Keep up the great work!</p>
                </div>
              </div>
              <div className="v-img">
                {" "}
                <img
                  src="http://homeseek-app.herokuapp.com/img/checkmark.0fe4b53e.svg"
                  alt="v-img"
                />{" "}
              </div>
            </div>
            <div className="earnings-container">
              <div className="earnings  flex space-between">
                <div>June earnings</div>
                <div className="green">$2,650</div>
              </div>
              <div className="views flex space-between">
                <div>60-day views</div>
                <div className="green">820</div>
              </div>
            </div>
            <div className="reviews">
              <div className="earnings flex space-between">
                <div>Overall rating</div>
                <div className="green flex">
                  <i className="fa fa-star "></i> <span>4.9</span>{" "}
                </div>
              </div>
              <div className="views flex space-between">
                <div>Total reviews</div>
                <div className="green">751</div>
              </div>
            </div>
            <div className="dashboard flex align-center justify-center">
              <img src={dashboard} alt={dashboard} />
            </div>
          </div>
        </section>
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

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);
