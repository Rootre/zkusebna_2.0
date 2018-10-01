import {Component} from 'react';
import {inject, observer} from 'mobx-preact';

import styles from './styles.scss';

@inject('filterItemsStore')
@observer
class Results extends Component {
    render() {
        const {filterItemsStore: {filteredItems}, itemTemplate} = this.props;

        if (filteredItems.length === 0) {
            return null;
        }

        return <div className={styles.resultsContainer}>
            {filteredItems.map(item => itemTemplate(item))}
        </div>;
    }
}

export default Results;