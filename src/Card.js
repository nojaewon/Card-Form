import './Card.css';
import React from 'react';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author: "Czech based",
            title: "UI/UX Designer",
            contents: [
                "Andrey is driven by turning ideas into scalable and empowering experiences that solve real life problems.",
                "He is currently the founder of Dvorak media. Previously, Andrey Was a product designer at Dropbox.",
                "Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more."
            ],
        }
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
        const author = this.state.author;
        const title = this.state.title;
        const contents = this.state.contents.map((content)=>{
            return (<p className='content'>{content}</p>);
        });

        return (
            <div className="card card-front">
                <div className='photo clearfix'></div>
                <div className='description'>
                    {author}
                    {title}
                    {contents}
                </div>
            </div>
        );
    }

    render(){
        return(
            <div className='card-container'>
                {this.getFrontPage()}
                {this.getFormPage()}
            </div>
        );
    }

}

export default Card;