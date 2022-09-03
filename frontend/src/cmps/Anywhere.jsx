import paris2 from '../assets/img/paris2.jpg'
import london2 from '../assets/img/london2.jpg'
// import newYork from '../assets/img/new-york.jpg'
import newYork2 from '../assets/img/newyork2.jpg'
// import istanbul from '../assets/img/istanbul.jpg'
import rome2 from '../assets/img/rome2.jpg'
import { Link } from 'react-router-dom'
export function Anywhere() {
    const places = 
    [
        { name: 'Paris', img: paris2},
        { name: 'London', img: london2},
        { name: 'New York', img: newYork2},
        // { name: 'Istanbul', img: istanbul},
        { name: 'Rome', img: rome2},
    ]

    return (
        <section className="live-anywhere grid">
            {places.map((place,idx) =>
                <Link to={`stay/?loc=${place.name}` } key={idx}>
                    <div className="anywhere-preview flex column">
                        <img src={place.img} alt={place.name} />
                        <div className="destination-name">
                            <span className="city">{place.name}</span>
                        </div>
                    </div>
                </Link>)}
        </section>
    )
}