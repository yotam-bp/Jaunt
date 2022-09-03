import { useState, useEffect } from "react";
import { ImgCarousel } from "../cmps/ImgCarousel";
import { Link } from "react-router-dom";
import { TxtLength } from "./TxtLength";
import Alert from "../cmps/Alert";

export function StayPreview({ stay, loggedInUser, addToWish, removeFromWish }) {
  const [onAlert, setOnAlert] = useState(null);

  const isOnWishlist = loggedInUser.wishlist.find(
    (saved) => saved._id === stay._id
  );

  const showAlert = (message) => {
    setOnAlert(message);
    setTimeout(() => {
      setOnAlert(null);
    }, 10000);
  };

  const add = async (stay, userId, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    let message;
    if (!isOnWishlist) {
      message = "Stay was added to your wishlist successfully";
      await addToWish(loggedInUser.wishlist, stay, userId);
      showAlert(message);
    } else {
      message = "Stay was removed from your wishlist successfully";
      await removeFromWish(loggedInUser.wishlist, stay._id, userId);
      showAlert(message);
    }
  };

  return (
    <div>
      <article className="stay-preview fs16 flex column">
        <ImgCarousel stay={stay} />
        <Link to={`/stay/${stay._id}`} className="primary-btn">
          <div className="stay-rate align-center space-between fs14 flex">
            <span className="left">
              <i className="fa fa-star"></i>
              <span className="reviews-rate">{stay.reviews[0].rate}</span>
              {stay.reviews.length === 1 && (
                <span className="reviews-amount">
                  ({stay.reviews.length} review)
                </span>
              )}
              {stay.reviews.length > 1 && (
                <span className="reviews-amount">
                  ({stay.reviews.length} reviews)
                </span>
              )}
            </span>
            {}
            {loggedInUser && (
              <span
                onClick={(ev) => add(stay, loggedInUser._id, ev)}
                className="save-btn right flex"
              >
                {isOnWishlist ? (
                  <i className="fas fa-heart" style={{ color: "salmon" }}>
                    {" "}
                  </i>
                ) : (
                  <i className="far fa-heart"> </i>
                )}
              </span>
            )}
          </div>
          <div className="stay-name fs16">
            <TxtLength className="stay-name-more fs8" text={stay.name} />{" "}
          </div>
          <p className="stay-summery fs16">{`${stay.capacity} guests`} </p>
          <p className="stay-price fs16">
            <span>
              <b>${stay.price}</b>
            </span>
            <span> / night</span>
          </p>
        </Link>
      </article>
      {onAlert && <Alert text={onAlert}  severity={"success"}/>}
    </div>
  );
}
