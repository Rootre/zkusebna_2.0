import {Component} from 'react';

import Category from '../Category';

import styles from './styles.scss';

class Subcategories extends Component {
    render() {
        const {level, subcategories} = this.props;

        if (subcategories.length === 0) {
            return null;
        }

        return (
            <div className={styles.subcategory} style={{paddingLeft: 20 * level}}>
                {subcategories.map(category => (
                    <Category key={category.id} level={level} {...category}/>
                ))}
            </div>
        )
    }
}

export default Subcategories;