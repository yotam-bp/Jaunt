import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { UserModal } from "./UserModal";
import { resetOrder } from "../store/actions/orderActions";
import { onLogout, loadUser } from "../store/actions/userActions";

class _Header extends Component {
  state = {
    isUserModalShown: false,
    isModalOpen: false,
  };

  async componentDidMount() {
    const { loggedInUser } = this.props;
    if (loggedInUser) {
      await this.props.loadUser(loggedInUser._id);
    }
  }

  openUserModal = () => {
    this.setState({ isUserModalShown: true });
  };

  closeUserModal = () => {
    this.setState({ isUserModalShown: false });
  };

  goToHomepage = () => {
    const emptyOrder = {
      location: "",
      startDate: "",
      endDate: "",
      guestAmount: { adults: 0, children: 0, infants: 0 },
    };
    this.props.resetOrder(emptyOrder);
  };

  logout = () => {
    this.props.onLogout();
    this.setState({ isUserModalShown: false });
  };
  render() {
    const { loggedInUser, orders } = this.props;
    const { isUserModalShown, isModalOpen } = this.state;
    return (
      <header className="flex space-between align-center">
        <div
          onClick={() => {
            this.goToHomepage();
          }}
          className="logo-container flex space-between"
        >
          <NavLink exact to="/">
            <i className="fab fa-airbnb fs34"></i>
            <span className="fs30" role="img" aria-label="logo">
              jaunt
            </span>
          </NavLink>
        </div>
        <section className="header-nav flex fs16">
          <NavLink to="/stay">Explore</NavLink>
          <NavLink to={loggedInUser ? "/add" : "/login"}>Become a Host</NavLink>
          <section />
        </section>
        <section>
          <button className="login-btn flex space-between align-center">
            <i className="fas fa-bars fs16"></i>
            {loggedInUser && (
              <div className="flex">
                <img
                  className="user-img justify-center"
                  src={loggedInUser.img}
                  alt="user profile"
                />
              </div>
            )}
            {!loggedInUser && <i className="fas fa-user-circle fs30"></i>}
          </button>
          <div className="user-container">
            <UserModal
              orders={orders}
              loggedInUser={loggedInUser}
              logout={this.logout}
              isUserModalShown={isUserModalShown}
              openUserModal={this.openUserModal}
              closeUserModal={this.closeUserModal}
            />
          </div>
        </section>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
    orders: state.userModule.orders,
  };
};
const mapDispatchToProps = {
  resetOrder,
  onLogout,
  loadUser
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);
