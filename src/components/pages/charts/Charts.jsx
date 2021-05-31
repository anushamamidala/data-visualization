import React, { useState, useEffect } from 'react'
import './charts.scss'
import { getHourlyData, getDailyData } from '../../../api/api-service'
import { Button, ButtonGroup } from 'react-bootstrap';
import get from 'lodash/get'
import ChartsControl from '../../controls/charts-control'
import { SwapSpinner } from "react-spinners-kit";

const Charts = props => {

    const [data, setData] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const fetchData = async (index) => {
        try {
            setLoading(true)
            setErrorMessage(null)
            let data = null;
            if (index === 0) {
                data = await getHourlyData()
            }
            else {
                data = await getDailyData()
            }
            setData(data);
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            setData(null)
            setErrorMessage(get(error, "response.data.message", "Something went wrong. Please try again later"))
        }
    }

    const toggleFirstOption = () => {
        fetchData(0);
        if (selectedIndex !== 0) {
            setSelectedIndex(0)
        }
    }

    const toggleSecondOption = () => {
        fetchData(1);
        if (selectedIndex !== 1) {
            setSelectedIndex(1)
        }
    }

    useEffect(() => { fetchData(1) }, [])

    return (
        <div>
            <div className="button-grp-container">
                <Button variant="secondary" onClick={toggleSecondOption}>DAILY</Button>
                <Button variant="secondary" onClick={toggleFirstOption}>HOURLY</Button>
            </div>
            <div className="charts-container">
                {
                    loading ?
                        <SwapSpinner /> :
                        <ChartsControl data={data} errorMessage={errorMessage} />
                }
            </div>
            <div className="footer-text">Total {data ? data.length : 0} results found</div>
        </div>
    )
}

export default Charts;