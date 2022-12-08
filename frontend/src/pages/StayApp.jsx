import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStays } from "../store/actions/stayActions.js";
import {
  setDates,
  setGuestAmount,
  setLocation,
} from "../store/actions/orderActions.js";
import { StayList } from "../cmps/StayList";
import { NavBar } from "../cmps/NavBar.jsx";
import { LoaderCmp } from "../cmps/LoaderCmp";
import { socketService } from "../services/socketService.js";
import {
  loadUser,
  addToWish,
  removeFromWish,
} from "../store/actions/userActions";

class _StayApp extends Component {
  state = {
    filterBy: {
      location: "",
    },
    isModalShown: false,
    isOnWish: false,
    x: 0,
    y: 0,
    isLoading: true,
  };

  async componentDidMount() {
    const { loggedInUser } = this.props;
    socketService.setup();
    const filterBy = this.getFilterBy();
    if (loggedInUser) {
      await this.props.loadUser(loggedInUser._id);
    }
    await this.props.loadStays(filterBy);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1500);
  }

  updateSearch = (prevProps, prevState) => {
    const currLocation = this.getFilterBy().location;
    let search = prevProps.location.search;
    let params = new URLSearchParams(search);
    let prevLocation = params.get("loc");
    console.log(prevLocation);
    if (currLocation !== prevLocation) {
      this.props.loadStays(this.getFilterBy());
    }
  };

  getFilterBy = () => {
    let search = this.props.location.search;
    let params = new URLSearchParams(search);
    let location = params.get("loc");
    const filterBy = { location };
    return filterBy;
  };

  onLoadStays = (filterBy) => {
    this.props.loadStays(filterBy);
  };

  render() {
    const {
      stays,
      order,
      setDates,
      setGuestAmount,
      setLocation,
      addToWish,
      loggedInUser,
      removeFromWish,
    } = this.props;

    if (!stays || stays === []) return <div>load</div>;
    const loc = this.getFilterBy().location;
    return (
      <section className="stay-app">
        <NavBar
          order={order}
          setDates={setDates}
          setGuestAmount={setGuestAmount}
          setLocation={setLocation}
          onLoadStays={this.onLoadStays}
        />
        {!loc && <h1 className="headline-explore">Explore all stays</h1>}
        {loc && <h1 className="headline-explore">Stays in {loc}</h1>}
        {this.state.isLoading ? (
          <LoaderCmp />
        ) : (
          <StayList
            stays={stays}
            addToWish={addToWish}
            loggedInUser={loggedInUser}
            removeFromWish={removeFromWish}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
    stays: state.stayModule.stays,
    order: state.orderModule.currOrder,
    wishlist: state.wishlistModule.wishlist,
  };
};
const mapDispatchToProps = {
  loadStays,
  setDates,
  setGuestAmount,
  setLocation,
  loadUser,
  addToWish,
  removeFromWish,
};

export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp);
