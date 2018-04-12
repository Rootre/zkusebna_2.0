import React from 'react'
import Modal from 'react-modal'

import DateRange from '../DateRange/index'
import Popup from '../Popup/index'
import ReservableTree from '../ReservableTree/index'
import TimePicker from '../TimePicker/index'

class ReservationPopup extends Popup {
    render() {
        const {reservation: {start, end}} = this.props

        return <Modal
            isOpen={true}
            style={{ overlay: this.overlayStyles }}
        >
            {this.CloseButton}
            <h2>Rezervace</h2>
            <DateRange start={start} end={end}/>
            <div>
                Od:<TimePicker/>
            </div>
            <div>
                Do:<TimePicker/>
            </div>
            <ReservableTree/>
        </Modal>
    }
}

export default ReservationPopup