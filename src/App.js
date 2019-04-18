import React from 'react';
import Nav from './Nav';
import './App.css';
import ItemPage from './ItemPage';
import {items} from './static-data';
import CartPage from './CartPage';


class App extends React.Component{

    state = {
        activeTab: 0,
        cart: []
    };

    handleTabChange = (index) => {
        this.setState({
            activeTab: index
        })
    }

    handleAddToCart = item => {
        this.setState({
            cart: [
                ...this.state.cart,
                item.id
            ]
        })

        // console.log(this.state.cart.length);
    }

    handleRemoveOne = item => {
        let index = this.state.cart.indexOf(item.id);
        this.setState({
            cart: [
                ...this.state.cart.slice(
                    0,
                    index
                ),
                ...this.state.cart.slice(
                    index + 1
                )
            ]
        });
    }

    renderCart(){
        console.log("What is cart: ", JSON.stringify(this.state.cart));
        let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
                console.log("itemCounts :", JSON.stringify(itemCounts), " item Id : ", itemId)
                itemCounts[itemId] = itemCounts[itemId] || 0;
                itemCounts[itemId]++;
                console.log("return values :", JSON.stringify(itemCounts))
                return itemCounts;
            },{}
            );
        
        let cartItems = Object.keys(itemCounts).map(itemId => {
                var item = items.find( item => item.id === parseInt(itemId,10) )
                return { ...item, count: itemCounts[itemId]};
            });
        return ( <CartPage items={cartItems} onAddOne={this.handleAddToCart} onRemoveOne={this.handleRemoveOne}/>)
    }


    renderContent(){
        switch(this.state.activeTab){
            default:
                case 0:
                    return( <ItemPage items={items} onAddToCart={this.handleAddToCart}/>)
                case 1:
                    return this.renderCart();
        }
        
    };

    render(){
        let { activeTab } = this.state;

        return(
            <div className="App">
                <Nav activeTab={activeTab} onTabChange={this.handleTabChange}/>
                <main className="App-content">
                    {this.renderContent()}
                </main>
            </div>
        );
    };
}


export default App