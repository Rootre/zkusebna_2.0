import React, {Component} from 'react'

export default class extends Component {
	state = {
		value: '...',
		editing: false,
	}

	_blur(payload) {
		const {value} = this.state
		let new_state = {editing: false}

		if (payload != value) {
			this._update(payload)
			new_state.value = payload
		}

		this.setState(new_state)
	}

	_edit() {
		if (!this.props.editable) {
			return;
		}

		this.setState({editing: true})
	}

	_keyUp(e) {
		switch (e.keyCode) {
			case 13:	//enter
				this._blur(e.target.value)
				break
			case 27:	//escape
				this._blur(this.state.value)
				break
		}
	}

	_update(payload) {
		const {id, update} = this.props

		update(id, payload)
	}

	componentDidMount() {
		const {value} = this.props

		this.setState({value})
	}

	render() {
		const {className} = this.props
		const {value, editing} = this.state

		return <div className={`EditableItem ${className}`} style={{display: 'inline-block'}}>
			{editing ?
				<input autoFocus type="text"
					   defaultValue={value}
					   onFocus={e => e.target.select()}
					   onKeyUp={e => this._keyUp(e)}
					   onBlur={e => this._blur(e.target.value)}/>
				:
				<strong onClick={() => this._edit()}>{value}</strong>}
		</div>
	}
}