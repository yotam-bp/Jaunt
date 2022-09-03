import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStays } from "../store/actions/stayActions.js";
import {
  setDates,
  setGuestAmount,
  setLocation,
} from "../store/actions/orderActions.js";
import { Link } from "react-router-dom";
import { Hero } from "../cmps/Hero.jsx";
import { Nearby } from "../cmps/Nearby";
import { Anywhere } from "../cmps/Anywhere";
import { GetInspired } from "../cmps/GetInspired";
import { BecomeHost } from "../cmps/BecomeHost";

class _Home extends Component {
  render() {
    const { order, setDates, setGuestAmount, setLocation, loggedInUser } =
      this.props;
    return (
      <div className="home home-container">
        <Hero
          order={order}
          setDates={setDates}
          setGuestAmount={setGuestAmount}
          setLocation={setLocation}
        />
        <section className="explore-nearby ">
          <h1>Explore nearby</h1>
          <Nearby />
          <section className="live-anywhere-constainer flex column">
            <h1>Live anywhere</h1>
            <Anywhere />
          </section>
          <Link to={`/stay`}>
            <section className="getInspired-container">
              <GetInspired />
            </section>
          </Link>
          <Link to={loggedInUser ? `/add` : `/login`}>
            <section className="become-host-container">
              <BecomeHost />
            </section>
          </Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    order: state.orderModule.currOrder,
    loggedInUser: state.userModule.loggedInUser,
  };
};
const mapDispatchToProps = {
  loadStays,
  setDates,
  setGuestAmount,
  setLocation,
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
