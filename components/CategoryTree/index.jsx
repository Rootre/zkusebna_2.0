import {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Category from '../Category';

import styles from './styles.scss';

@inject('categoryStore')
@observer
class CategoryTree extends Component {
    render() {
        const {categoryStore: {topCategories}} = this.props;

        return (
            <div className={styles.wrapper}>
                {topCategories.map(category => (
                    <Category key={category.id} level={0} {...category}/>
                ))}
            </div>
        );
    }
}

export default CategoryTree;