import React from 'react';
import Card from './Card';

class CardApp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cardList: []
        }
    }

    getCard(){
        const tempList = this.state.cardList;
        const newCard = new Card();
        tempList.append(newCard);

        this.setState({
            cardList:tempList,
        })
    }

    render(){
        const card = <Card/>

        return (
            <div className='cardApp'>
                {card}
            </div>
        );
    }
}

export default CardApp;