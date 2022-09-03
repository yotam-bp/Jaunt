import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';
// import '../assets/css/pages/about-page.css'
class _GoogleMap extends Component {

    state = {
        pos: {
            adddress: null,
            lat: null,
            lng: null
        },
        isMobile: false
    }

    componentDidMount() {
        const pos = this.props.stay.loc
        const isMobile = this.props.isMobile
        this.setState({ pos, isMobile})
    }

    render() {
        const { pos, isMobile } = this.state
        return (
            <div className="map-container">
                <h1>Location</h1>
                { isMobile ?
                    <Map
                        google={this.props.google}
                        zoom={15}
                        center={pos}
                        containerStyle={{
                            width: '340px',
                            height: '300px',
                            marginTop: '20px',
                        }}>
                        <Marker
                            position={pos}
                            name={'stay location'} />
                    </Map> 
                    :
                    <Map
                        google={this.props.google}
                        zoom={15}
                        center={pos}
                        containerStyle={{
                            width: '1280px',
                            height: '500px',
                            marginTop: '20px',
                        }}>

                        <Marker
                            position={pos}
                            name={'stay location'} />
                    </Map>
                }
            </div>
        )
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: (`AIzaSyBnQ0ebntiaqnKC_liI8ybwWzqTD68V02w`)
})(_GoogleMap)