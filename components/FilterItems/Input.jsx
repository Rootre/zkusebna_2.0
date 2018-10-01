import {Component} from 'react';
import classNames from 'classnames';
import {inject, observer} from 'mobx-preact';

import SearchSVG from 'Svg/search.svg';
import ResetSVG from 'Svg/close.svg';

import styles from './styles.scss';

@inject('filterItemsStore')
@observer
class Input extends Component {

    handleChange = e => {
        const {filterItemsStore} = this.props;

        filterItemsStore.setSearchText(e.target.value);
        filterItemsStore.setFilteredItems();
    };
    handleTextReset = e => {
        e.preventDefault();

        const {filterItemsStore} = this.props;

        filterItemsStore.resetSearchText();
        filterItemsStore.resetFilteredItems();
    };

    componentDidMount() {
        const {filterItemsStore, items, searchKey} = this.props;

        filterItemsStore.setItems(items);
        filterItemsStore.setSearchKey(searchKey);
    }

    render() {
        const {className, filterItemsStore: {searchText}, placeholder} = this.props;

        return <div className={classNames(className, styles.inputContainer)}>
            <SearchSVG className={styles.search} width={16} height={16}/>
            <input
                type={'text'}
                onKeyUp={this.handleChange}
                placeholder={placeholder}
                value={searchText}
            />
            {searchText.length > 0 && <ResetSVG className={styles.reset} onClick={this.handleTextReset} width={16} height={16}/>}
        </div>
    }
}

export default Input;