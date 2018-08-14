import React from 'react';
import {inject, observer} from 'mobx-react';
import Modal from 'react-modal';

import DateRange from '../DateRange/index'
import Popup from '../Popup/index'
import ReservableTree from '../ReservableTree/index'
import TimePicker from '../TimePicker/index'

@inject('categoryStore')
@observer
class ReservationPopup extends Popup {
    render() {
        const {categoryStore, reservation: {start, end}} = this.props

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
            <ReservableTree categories={categoryStore.structuredCategories}/>
        </Modal>
    }
}

export default ReservationPopup