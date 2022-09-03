import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@material-ui/core'
// import { Height } from '@material-ui/icons'
import { Link } from 'react-router-dom'

export function ImgCarousel({ stay}) {

    return (
        <Carousel
            fullHeightHover={true}
            animation={'slide'}
            swipe={true}
            timeout={300}
            autoPlay={false}
            navButtonsProps={{
                style: {
                    // position:'absolute',
                    backgroundColor: 'white',
                    color: 'black',
                    width:'15px',
                    height:'15px'
                    //  bottom:'20px',
                }
            }}

            indicatorIconButtonProps={{
                style: {
                    color: "#ffffffba",
                }
            }}
            indicatorContainerProps={{
                style: {
                    position: 'absolute',
                    bottom: '20px',
                }
            }
            }
            activeIndicatorIconButtonProps={{
                style:{color: "white"}
            }} >

            {
                stay.imgUrls.map((img, idx) =>
                    <Link to={`/stay/${stay._id}`} className="primary-btn" key={idx} >
                        <img src={img} alt="rooms"/>
                    </Link>)
            }

        </Carousel>
    )
}