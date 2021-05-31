import React, { useState } from 'react';
import NavigationMenu from '../../controls/navigation-menu/NavigationMenu'
import DataTables from '../data-tables/DataTables'
import Charts from '../charts/Charts'
import Maps from '../maps/Maps'
import './home.scss'
import { Modal, Button } from 'react-bootstrap'

const Home = props => {
    const [index, setIndex] = useState(1)
    const [showModal, setShowModal] = useState(true)

    const getComponent = () => {
        switch (index) {
            case 0: return <Charts />
            case 1: return <DataTables />
            case 2: return <Maps />
            default: return <div>Invalid Selection</div>
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return <div className="row">
        <div className="col-3 navigation-menu">
            <NavigationMenu index={index} setIndex={setIndex} />
        </div>
        <div className="col-9 content-container">
            {getComponent()}
        </div>
        <Modal show={showModal}>
            <Modal.Header>
                <Modal.Title>Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>All the api's are limited to 5 requests for every 15 seconds.
                    If you make 5 requests in 15 seconds, you would be shown with an error.
                    Try calling it again after 15 seconds.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Okay</Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default Home;