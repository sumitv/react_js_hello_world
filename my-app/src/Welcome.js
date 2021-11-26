import React from 'react';
import Toggle from './Toggle.js';
import './index.css'

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), 
            stop: false, 
            chk: false,
            isLoaded: false,
            data: null,
            support: null,
            error: null
        };        
        this.handleClick = this.handleClick.bind(this);
        this.handleChk = this.handleChk.bind(this);
    }

    handleChk(e) {
        this.setState({chk: e.target.checked});
    }

    handleClick(e) {
        {
            if(this.state.stop===true) {
                // this.state.stop= false; //no rebuild, it would be otherwise
                this.setState({stop: (!this.state.stop)})
                // e.target.innerHTML='Stop'
                this.timerId = setInterval(
                    () => this.tick(), 1000
                );
            }
            else {
                // this.state.stop= true;
                this.setState({stop: (!this.state.stop)})
                // e.target.innerHTML='Resume'
                clearInterval(this.timerId);                
            }                
        }         
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(), 1000
        );
        fetch("https://reqres.in/api/products/3")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(
                        {
                            isLoaded: true,
                            data: result.data,
                            support: result.support
                        }
                    )
                }
            )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        const numbers = [1,2,3];
        const list = numbers.map((n) => <li>{n*3}</li>);
        return (
            <div style={{marginTop: -60}}>
                <h6>Hello {this.props.name}, its {this.state.date.toLocaleTimeString()}                
                &nbsp;&nbsp;&nbsp;
                <button className={"Button"+this.state.stop} style={{fontWeight: 'bold'}} onClick={this.handleClick}>
                    {this.state.stop===true?'Resume':'Stop'}                        
                </button>                
                {/* <Toggle />                 */}
                <input type="checkbox" name="cb1" 
                    onChange={this.handleChk}></input>
                {
                    this.state.chk===true &&
                    <img style={{marginLeft: 10, marginTop: 0}} height='25' src='https://media.istockphoto.com/photos/red-dodgeball-picture-id895119304?b=1&k=20&m=895119304&s=170667a&w=0&h=ccg2el6yOjmIr-KSQjE7twF7Z4HRBvw34NrM2h2aHEg='></img>
                }
                </h6>                
                <ul style={{fontSize: 13, marginTop: -30}}>
                    {list}
                </ul>                
                {
                    this.state.isLoaded===false 
                    ? <div>Loding...</div>
                    : <div style={{fontSize: 10}}>
                        Sample API Call...                        
                        <br/><br/> id: {this.state.data.id}
                        <br/> name: {this.state.data.name}
                        <br/> year: {this.state.data.year}
                        <br/> color: {this.state.data.color}
                        {/* <br/> url: {this.state.support.url}
                        <br/> text: {this.state.support.text} */}
                    </div>
                }
            </div>
        )
    }
}

export default Welcome;