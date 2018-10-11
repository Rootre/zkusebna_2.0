import {Component} from 'react';
import {computed} from 'mobx';
import classNames from 'classnames';
import {inject, observer} from 'mobx-react';

import ItemList from '../ItemList';
import Subcategories from '../Subcategories';

import styles from './styles.scss';

@inject('categoryStore', 'itemStore')
@observer
class Category extends Component {

    @computed
    get items() {
        if (!this.isActive) {
            return [];
        }

        const {id, itemStore} = this.props;

        return itemStore.getItemsByCategoryId(id);
    }

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

        categoryStore.isCategoryActive(id)
            ? categoryStore.deleteActiveCategory(level)
            : categoryStore.setActiveCategory(level, id);
    };

    render() {
        const {className, level, name} = this.props;

        return (
            <div className={classNames(className, styles.wrapper)}>
                <span className={classNames(styles.category, {
                    [styles.active]: this.isActive,
                    [styles.subcategory]: level > 0,
                })} onClick={this.handleCategoryClick}>{name}</span>
                <Subcategories level={level + 1} subcategories={this.subcategories}/>
                <ItemList items={this.items}/>
            </div>
        );
    }
}

export default Category;