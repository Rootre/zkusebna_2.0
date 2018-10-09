import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import CategoryTree from '../CategoryTree';

import styles from './styles.scss';

@inject('categoryStore')
@observer
class NewReservation extends Component {
    render() {
        const {end_day, start_day} = this.props;

        return (
            <div className={styles.wrapper}>
                <h2>Nová rezervace</h2>
                <p>start: <strong>{start_day.toString()}</strong></p>
                <p>end: <strong>{end_day.toString()}</strong></p>
                <h3>Položky</h3>
                <div className={styles.categories}>
                    <CategoryTree/>
                </div>
            </div>
        )
    }
}

export default NewReservation;