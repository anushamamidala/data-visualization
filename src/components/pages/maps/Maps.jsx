import React, { useState, useEffect } from 'react';
import { getPoints } from '../../../api/api-service'
import get from 'lodash/get'
import MapControl from '../../controls/map-control/MapControl'
import "./maps.scss"

const Maps = props => {
    const [data, setData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getPoints();
            setData(response);
            setLoading(false)
        }
        catch (error) {
            setLoading(false);
            setErrorMessage(get(error, "response.data.message", "something went wrong!"));
        }
    }

    useEffect(() => { fetchData() }, [])

    return <div className="map-main-container">
        <div className="footer-text">Total {data ? data.length : 0} results found</div>
        <MapControl data={data} errorMessage={errorMessage} loading={loading} />
    </div>
}

export default Maps;