import React from 'react';
import Proptypes from 'prop-types';
import './ItemPage.css';
import Item from './Item';

function ItemPage({ items, onAddToCart }){
    return(
        <ul className="ItemPage-items">
            {items.map(item =>
                <li key={item.id} className="ItemPage-item">
                    <Item item={item}>
                        <button className="Item-addToCart" onClick={() => onAddToCart(item)}>Add to Cart</button>
                    </Item>
                </li>
            )}
        </ul>
    );
}
ItemPage.propTypes = {
    items: Proptypes.array.isRequired,
    onAddToCart: Proptypes.func.isRequired
}

export default ItemPage