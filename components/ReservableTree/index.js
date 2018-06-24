import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

import CategoryList from '../CategoryList'

@inject('store')
@observer
class ReservableTree extends Component {
    render () {
        let data

        return <div className={`ReservableTree`}>
            {data && data.length && data.map(category => {
                const {id} = category

                return <CategoryList level={2} key={id} {...category}/>
            })}
        </div>
    }
}

export default ReservableTree