import inspierdImg from '../assets/img/get-inspired.jpg'

export function GetInspired() {

    return (
        <div className="inspiration">
            <div className="img-wrapper">
            <img src={inspierdImg} alt="" />
            </div>
            <div className="details flex column justify-center">
                <h1>The Greatest Houses</h1>
                <p>Wishlists curated by Jaunt</p>
                <button className="inspire-btn">Get Inspired</button>
            </div>
        </div>

    )

}