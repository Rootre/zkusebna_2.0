import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

import CategoryList from '../CategoryList/index'

@inject('store')
@observer
class ReservableTree extends Component {
    render () {
        const { store: {getStructuredCategories} } = this.props
        let data

        try {
            data = getStructuredCategories().data.structuredCategories;
        }
        catch (err) {
            console.error('DAMN...', err.message);
        }

        return <div className={`ReservableTree`}>
            {data && data.length && data.map(category => {
                const {id} = category

                return <CategoryList level={2} key={id} {...category}/>
            })}
        </div>
    }
}

export default ReservableTree