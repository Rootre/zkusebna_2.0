import React from 'react'
import Modal from 'react-modal'

import DateRange from '../DateRange/index'
import Popup from '../Popup/index'

export default class CalendarPopup extends Popup {
    render() {
        const {event: {end, items, start, title, user: {name}}} = this.props

        return <Modal
            isOpen={true}
            style={{ overlay: this.overlayStyles }}
        >
            {this.CloseButton}
            <div style={{ float: 'right' }}>
                <DateRange showTime start={start} end={end}/>
            </div>
            <h2>{title}</h2>
            <p>Rezervoval: <strong>{name}</strong></p>
            <h3>Rezervavané věci:</h3>
            <ul>
                {items.length && items.map(({name}) => <li key={name}>{name}</li>)}
            </ul>
        </Modal>
    }
}