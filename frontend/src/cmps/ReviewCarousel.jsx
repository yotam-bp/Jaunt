import Carousel from 'react-material-ui-carousel'

export function ReviewCarousel({ reviews }) {

    return (
        <Carousel
            fullHeightHover={true}
            animation={'slide'}
            swipe={true}
            timeout={300}
            autoPlay={false}
            navButtonsProps={{
                style: {
                    backgroundColor: 'black',
                    color: 'white',
                    width:'15px',
                    height:'15px'
                }
            }}

            indicatorIconButtonProps={{
                style: {
                    color: "#ffffffba",
                }
            }}
            indicatorContainerProps={{
                style: {
                    display: 'none'
                }
            }
            }
            activeIndicatorIconButtonProps={{
                style:{display: "white"}
            }} >

            {
               reviews.map((review,idx) =>
                <article className="flex column" key={idx}>
                    <div className="review-by flex align-center">
                        <img className="host-img" src={review.by.imgUrl} alt="host"/>
                        <h4 className="review-name">{review.by.fullname}</h4>
                    </div>
                    <div className="review-parameters flex column">
                        <p className="review-txt">{review.txt}</p>
                    </div>
                </article>
            )}
        </Carousel>
    )
}