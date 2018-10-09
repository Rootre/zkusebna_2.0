import {Component} from 'react';
import {computed} from 'mobx';
import classNames from 'classnames';
import {inject, observer} from 'mobx-react';

import Subcategories from '../Subcategories';

import styles from './styles.scss';

@inject('categoryStore')
@observer
class Category extends Component {

    @computed
    get subcategories() {
        if (!this.isActive) {
            return [];
        }

        const {categoryStore, id} = this.props;

        return categoryStore.getCategoriesByParentId(id);
    }
    @computed
    get isActive() {
        const {categoryStore: {active_categories}, id, level} = this.props;

        return active_categories.has(level) && active_categories.get(level) == id;
    }

    handleCategoryClick = async () => {
        const {categoryStore, id, level} = this.props;

        categoryStore.setActiveCategory(level, id);
    };

    render() {
        const {className, level, name} = this.props;

        return (
            <div className={classNames(className, styles.category)} onClick={this.handleCategoryClick}>
                <span className={classNames({
                    [styles.active]: this.isActive,
                })}>{name}</span>
                <Subcategories level={level + 1} subcategories={this.subcategories}/>
            </div>
        );
    }
}

export default Category;