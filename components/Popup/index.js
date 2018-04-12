import React, {Component} from 'react'
import Modal from 'react-modal'

class Popup extends Component {
    componentWillMount() {
        if (typeof document !== 'undefined') {
            Modal.setAppElement('#app')
        }
    }

    get overlayStyles() {
        return {
            zIndex: 99
        }
    }
    get CloseButton() {
        const {onClose} = this.props

        return <span
            style={{
                cursor: 'pointer',
                fontSize: '1.7em',
                position: 'absolute',
                right: '10px',
                top: 0,
            }}
            onClick={e => onClose()}
        >&times;</span>
    }
}

export default Popup