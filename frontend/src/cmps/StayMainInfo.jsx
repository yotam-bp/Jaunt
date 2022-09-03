import { Link } from "react-router-dom";

export function 
StayMainInfo({ stay }) {
  return (
    <section>
      <div className="details-title">
        <div className="title-primary fs24">
          <h1>{stay.name}</h1>
        </div>
        <div className="title-secondery flex space-between fs14">
          <div className="left flex space-between">
            <div className="stay-rate flex align-center space-between">
              <i className="fa fa-star"></i>
              <span className="reviews-rate">{stay.reviews[0].rate}</span>
              {stay.reviews.length === 1 && (
                <span className="reviews-amount">
                  {" "}
                  ({stay.reviews.length} review)
                </span>
              )}
              {stay.reviews.length > 1 && (
                <span className="reviews-amount">
                  ({stay.reviews.length} reviews)
                </span>
              )}
            </div>
            <div>
              <Link to={`/stay/?loc=${stay.loc.address}`}>
                {stay.loc.address}
              </Link>
            </div>
          </div>
          <div className="right flex space-between">
            <div>
              <i className="fa fa-share-square-o"></i> share
            </div>
            <div>
              <i className="fa fa-heart-o"></i> save
            </div>
          </div>
        </div>
      </div>
      <div className="img-grid-container">
        {stay.imgUrls.map((img, idx) => (
          <img src={img} alt="" key={idx} />
        ))}
      </div>
    </section>
  );
}
