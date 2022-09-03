import host from '../assets/img/become-a-host.jpg'

export function BecomeHost() {
    return (
        <div className="host">
            <div className="img-wrapper">
            <img src={host} alt="" />
            </div>
            <div className="details flex column justify-center">
                <h1>Become a Host</h1>
                <p>Earn extra income and unlock new opportunities by sharing your space.</p>
                <button className="more-btn">Learn more</button>
            </div>
        </div>
    )
}