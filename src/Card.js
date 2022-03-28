import './Card.css';
import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        
    }

    getFormPage(){
        return (
            <div className="card card-back">
                <h2>Let's get in touch!</h2>
                <form action='#' className="form-container">
                    <ul className='clearfix'>
                        <li><input type="text" placeholder='Your first name'></input></li>
                        <li><input type='text' placeholder='Your last name'></input></li>
                        <li><input type='text' placeholder='Your email address'></input></li>
                        <li><input type='text' placeholder='Subject'></input></li>
                        <li><textarea placeholder='Your message'></textarea></li>
                        <li><input type="submit" value="submit"></input></li>
                    </ul>
                </form>
            </div>
        );
    }

    getFrontPage(){
        const author = this.props.cardInfo.author;
        const title = this.props.cardInfo.title;
        const imgURL ='./images/' + this.props.cardInfo.imageInfo[0];
        const contents = this.props.cardInfo.contents.map((content)=>{
            return (<p key={content[0]} className='content'>{content[1]}</p>);
        });

        return (
            <div className="card card-front">
                <div className='photo clearfix'>
                    <img src={imgURL} alt={this.props.cardInfo.imageInfo[1]}></img>
                </div>
                <div className='description'>
                    {author}
                    {title}
                    {contents}
                </div>
            </div>
        );
    }

    render(){
        const className = 'card-container card-style-' + this.props.value;

        return(
            <div className={className}>
                {this.getFrontPage()}
                {this.getFormPage()}
            </div>
        );
    }

}

export default Card;