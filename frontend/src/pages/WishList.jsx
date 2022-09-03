import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser, removeFromWish } from "../store/actions/userActions";
import { Header } from "../cmps/Header.jsx";
import { Link } from "react-router-dom";
import trips from "../assets/img/trips.jpg";

class _WishList extends Component {
  async componentDidMount() {
    const user = await this.props.loadUser(this.props.loggedInUser._id);
    console.log("hi", user);
  }

  remove = (ev, wishlist, wishId, userId) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.removeFromWish(wishlist, wishId, userId);
  };

  render() {
    const { wishlist, _id } = this.props.loggedInUser;
    if (!wishlist) return <div>There's nothing to see here</div>;
    return (
      <section className="wishlist-page">
        <Header />
        <h2>Wishlist</h2>
        <div className="divider"></div>
        <div className="wishlist-container grid">
          {wishlist.length === 0 ? (
            <div>There's nothing to see here</div>
          ) : (
            wishlist.map((wish, idx) => (
              <Link to={`/stay/${wish._id}`} className="primary-btn" key={idx}>
                <article className="flex column">
                  <img src={wish.imgUrls[0]} alt="stay" />
                  <span
                    className="remove"
                    onClick={(ev) => this.remove(ev, wishlist, wish._id, _id)}
                  >
                    <i className="fs20 fas fa-trash"></i>
                  </span>
                  <section className="wishlist-details">
                    <h2 className="country fs26">{wish.loc.country}</h2>
                    <div className="divider"></div>
                    <div className="fs14 description flex space-between align-center">
                      <div className="img-container flex">
                        <img
                          className="small"
                          src={wish.imgUrls[0]}
                          alt="stay"
                        />
                      </div>
                      <div className="flex">{wish.name}</div>
                      <span className="arrow flex  fs30">›</span>
                    </div>
                  </section>
                </article>
              </Link>
            ))
          )}
        </div>
        <img src={trips} alt="trips" style={wishlist.length === 0 ? {padding : "10% 0"} : {padding: "0"}} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.userModule.wishlist,
    loggedInUser: state.userModule.loggedInUser,
  };
};
const mapDispatchToProps = {
  loadUser,
  removeFromWish,
};

export const WishList = connect(mapStateToProps, mapDispatchToProps)(_WishList);
