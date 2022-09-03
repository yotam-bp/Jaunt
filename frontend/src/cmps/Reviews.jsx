import React from 'react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Button from '@material-ui/core/Button';
import { ReviewCarousel } from './ReviewCarousel'

export function Reviews({ reviews, isMobile }) {
    const reviewCtg = ['Cleanliness', 'Accuracy', 'Communication', 'Location', 'Check-in', 'Value'];
    return (
        <section id="reviews" className="reviews-container details-container flex column">
            <h2 className="value-rate flex space-between ">
                <span className="stay-rate flex align-center">
                    <i className='fa fa-star fs18'></i>
                    {reviews.length === 1 && <span className="reviews-amount fs22">{reviews.length} review</span>}
                    {reviews.length > 1 && <span className="reviews-amount fs22">{reviews.length} reviews</span>}
                </span>
            </h2>
            <div className="user-reviews flex space-between">
                {isMobile ?
                    <ReviewCarousel reviews={reviews} />
                    :
                    <div className="flex wrap space-between">
                        {reviews.map((review,idx) =>
                            <article className="flex column" key={idx}>
                                <div className="review-by flex align-center">
                                    <img className="host-img" src={review.by.imgUrl} alt="host" />
                                    <h4 className="review-name">{review.by.fullname}</h4>
                                </div>
                                <div className="review-parameters flex column">
                                    <p className="review-txt">{review.txt}</p>
                                </div>
                            </article>)}
                    </div>
                }
            </div>
            <div className="add-review-container flex ">
                <h2>Add a review</h2>
                <div className="details-container flex ">
                    <div className="stars-container flex justify-center">
                        {reviewCtg.map((ctg,idx) =>
                            <article className="review-ctg flex space-evenly" key={idx}>
                                <h4>{ctg}</h4>
                                <Rate />
                            </article>
                        )}
                    </div>
                    <textarea name="add-review" cols="30" rows="10"></textarea>
                </div>
                <Button variant="contained" color="secondary">Add review</Button>
            </div>
        </section>

    )
}
