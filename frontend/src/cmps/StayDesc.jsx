export function StayDesc({ stay }) {
    return (
        <div>
            <div className="desc-title flex space-between">
                <div className="titles">
                    <h2>{`Entire apartment hosted by ${stay.host.fullname}`}</h2>
                    <p>{`${stay.capacity} guests `}</p>
                </div>
                <img className="host-img" src={stay.host.imgUrl} alt="profile" />
            </div>
            <div className="divider"></div>
            <section className="info-container details-container">
                <div className="info flex">
                    <i className="fas fa-home"></i>
                    <span>
                        <h4>Entire home</h4>
                        <p>You’ll have the apartment to yourself.</p>
                    </span>
                </div>
                <div className="info flex">
                    <i className="fas fa-hand-sparkles"></i>
                    <span>
                        <h4>Enhanced Clean</h4>
                        <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
                    </span>
                </div>
                {!stay.amenities.includes('Smoking allowed' && 'Pets allowed') &&
                    <div className="info flex">
                        <i className="fas fa-scroll"></i>
                        <span>
                            <h4>House rules</h4>
                            <p>The host doesn’t allow pets, parties, or smoking.</p>
                        </span>
                    </div>}
            </section>
            <div className="divider"></div>
            <div className="details-container">
                <p>{stay.summary}</p>
            </div>

        </div>
    )
}