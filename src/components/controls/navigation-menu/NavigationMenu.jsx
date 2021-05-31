import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { FaTable } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './navigation-menu.scss'

const NavigationMenu = props => {
    const { index, setIndex } = props;
    return (
        <React.Fragment>
            <img
                className="eut-light"
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Ficon%2Fpie-chart-1214&psig=AOvVaw17hCiUpPwAEdq4v6krIn3S&ust=1622573072363000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi7nfDJ9PACFQAAAAAdAAAAABAJ"
                alt="Light Image" />
            <ul>
                <li
                    className={index === 1 ? "selected-nav-item" : "nav-item"}
                    onClick={() => { setIndex(1) }}><FaTable /> &nbsp; TABLE</li>
                <li
                    className={index === 0 ? "selected-nav-item" : "nav-item"}
                    onClick={() => { setIndex(0) }}><FaChartBar /> &nbsp; CHARTS</li>
                <li
                    className={index === 2 ? "selected-nav-item" : "nav-item"}
                    onClick={() => { setIndex(2) }}><FaMapMarkerAlt /> &nbsp; MAPS</li>
            </ul>
        </React.Fragment >
    )
}

export default NavigationMenu;