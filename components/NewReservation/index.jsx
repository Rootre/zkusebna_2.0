import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {getCategoriesByParentId} from '../../api/category';

import styles from './styles.scss';

@inject('categoryStore')
@observer
class NewReservation extends Component {

    handleTopCategoryClick = async id => {
        try {
            const subCategories = await getCategoriesByParentId(id);
            console.log(subCategories);
        }
        catch (e) {
            console.error(e.message);
        }
    };

    render() {
        const {categoryStore, end_day, start_day} = this.props;

        return (
            <div className={styles.wrapper}>
                <h2>Nová rezervace</h2>
                <p>start: <strong>{start_day.toString()}</strong></p>
                <p>end: <strong>{end_day.toString()}</strong></p>
                <h3>Položky</h3>
                <div className={styles.categories}>
                    {categoryStore.top_categories.map(({id, name}) => (
                        <div
                            className={styles.top_category}
                            key={id}
                            onClick={() => this.handleTopCategoryClick(id)}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default NewReservation;