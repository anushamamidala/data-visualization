import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { ButtonToolbar, OverlayTrigger, Button, Tooltip, Alert } from 'react-bootstrap'
import { SwapSpinner } from "react-spinners-kit";

const AnyReactComponent = ({ text }) => <div style={{ fontSize: 30 }}><ButtonToolbar>
    <OverlayTrigger
        key={'top'}
        placement={'top'}
        overlay={
            <Tooltip id={`tooltip-top`}>{text}</Tooltip>
        }
    >
        <Button variant="secondary"><FaMapMarkerAlt /></Button>
    </OverlayTrigger>

</ButtonToolbar></div>;

class Map extends Component {
    state = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    componentDidUpdate = (props) => {
        if (this.props.data && this.props.data.length > 0) {
            if (this.state.center.lat !== this.props.data[0].lat) {
                this.setState({
                    center: {
                        lat: this.props.data[0].lat,
                        lng: this.props.data[0].lon
                    },
                    zoom: 11
                })
            }
        }
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ width: '80%', height: "100%", marginLeft: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="maps-container">
                {
                    this.props.data &&
                    this.props.data.length > 0 &&
                    !this.props.errorMessage &&
                    !this.props.loading &&
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        {
                            this.props.data &&
                            this.props.data.length > 0 &&
                            this.props.data.map(item => {
                                return <AnyReactComponent
                                    lat={item.lat}
                                    lng={item.lon}
                                    text={item.name}
                                />
                            })
                        }
                    </GoogleMapReact>
                }
                {
                    this.props.errorMessage &&
                    <div className="error-message-container">
                        <Alert variant={'danger'}>
                            {this.props.errorMessage}
                        </Alert>
                    </div>
                }
                {
                    this.props.loading &&
                    <SwapSpinner />
                }
            </div>
        );
    }
}

export default Map;