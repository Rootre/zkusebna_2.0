import React, {Component} from 'react'
import {observer} from 'mobx-react'

import ItemList from "../ItemList/index"

@observer
class CategoryList extends Component {
	state = {
		closed: true
	}

	_categoryClick(e) {
        this.setState({closed: !this.state.closed})
	}

	render () {
		const { children, id, items, level, name } = this.props
		const {closed} = this.state

		const NameWrapper = `h${parseInt(level)}`

		return <div className={`Category category-${id}`}>
            <NameWrapper onClick={e => this._categoryClick(e)}>{name}</NameWrapper>
            {!closed && items && items.length > 0 && <ItemList items={items}/>}
            {!closed && children && children.length > 0 && children.map(category => <CategoryList key={category.id} level={level+1} {...category}/>)}
		</div>
	}
}

export default CategoryList