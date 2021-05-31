import React, { useState, useEffect } from 'react';
import { getHourlyData, getDailyData } from '../../../api/api-service'
import moment from 'moment'
import { FaSort } from "react-icons/fa";
import sortBy from 'lodash/sortBy'
import v4 from 'uuid/v4'
import './data-tables.scss'
import { SwapSpinner } from "react-spinners-kit";
import { Button, ButtonGroup, Alert } from 'react-bootstrap';
import get from 'lodash/get'
import Highlighter from "react-highlight-words";

const DataTables = props => {

    const [data, setData] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)
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

    const sortValue = (value) => {
        let sortOrder = sortingOrder || {}
        if (sortOrder[value] === "desc" || sortOrder[value] === undefined) {
            sortOrder = {}
            sortOrder[value] = "asc";
            setSortingOrder(sortOrder);
            const alteredData = sortBy(data, value);
            setData(alteredData)

        }
        else {
            sortOrder = {}
            sortOrder[value] = "desc";
            setSortingOrder(sortOrder)
            const alteredData = sortBy(data, value);
            setData(alteredData.reverse())
        }
    }

    const filterDataOnSearch = (event) => {
        setSearchText(event.target.value)
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

    const getFilteredData = () => {
        return data.filter(item => {
            const date = moment(get(item, "date", "")).format("Do MMM YY").toString().toLowerCase();
            const hours = get(item, "hour", "").toString();
            const events = get(item, "events", "").toString();
            return date.includes(searchText.toLowerCase()) || hours.includes(searchText) || events.includes(searchText)
        })

    }

    const getRowHeaders = () => {
        if (data && data.length > 0 && !errorMessage) {
            let firstItem = data[0];
            const keys = Object.keys(firstItem);
            return keys;
        }
        return null;
    }

    const parseValue = (data, key) => {
        if (key === "date") {
            return moment(data[key]).format("Do MMM YY")
        }
        else {
            return data[key].toString();
        }
    }



    useEffect(() => { fetchData(0) }, [])

    const tableData = searchText ? getFilteredData() : data;
    const rowHeaders = getRowHeaders();
    const WIDTH = rowHeaders && rowHeaders.length > 0 ? ((100 / rowHeaders.length) + "%") : 0
    const infoText = loading ? "Loading Data..." : (tableData ? tableData.length + " Results found" : "...")
    return <div className="table-main-container">
        <div className="search-container">
            <input placeholder="Search.." className="search-bar" onChange={filterDataOnSearch} />
            <Button variant="secondary" onClick={toggleFirstOption}>HOURLY</Button>
            <Button variant="secondary" onClick={toggleSecondOption}>DAILY</Button>
        </div>
        <div className="result-found-div">{infoText}</div>
        <div className="row table-header">
            {
                rowHeaders && rowHeaders.length > 0 &&
                rowHeaders.map(item => <div className="table-header-item" style={{ width: WIDTH }} key={v4()}>{item.toUpperCase()} &nbsp;
                    <div className="sort-icon" onClick={() => { sortValue(item) }}><FaSort /></div></div>)
            }
        </div>
        <div className="table-data-container">
            {
                !errorMessage && (
                    loading ? <div className="spinner-container"><SwapSpinner size={30} color="#686769" loading={loading} /></div> :
                        tableData && tableData.length > 0 ? tableData.map(item => {
                            return <div className="table-body-row" key={v4()}>
                                {
                                    rowHeaders.map(key => {
                                        return <div key={v4()} className="table-body-item" style={{ width: WIDTH }}><Highlighter
                                            highlightClassName="high-light-class"
                                            searchWords={[searchText]}
                                            autoEscape={true}
                                            textToHighlight={parseValue(item, key)}
                                        /></div>
                                    })
                                }
                            </div>
                        }) : <div className="no-results">No results found</div>)
            }
            {
                errorMessage &&
                <div className="error-message-container">
                    <Alert key={v4()} variant={'danger'}>
                        {errorMessage}
                    </Alert>
                </div>
            }
        </div>
        <div className="footer-text">Table Representation</div>
    </div>
}

export default DataTables;