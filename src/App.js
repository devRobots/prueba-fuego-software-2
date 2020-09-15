import React from 'react';
import logo from './logo.svg';
import './App.css';



class Review extends React.Component{
  
  state={
    rev: '',
    show: true
  }

  onChange = e => {this.setState({rev: e.target.value})}

  render(){
 
    if(this.state.show)
    {
      return(
        <div>
          <textarea placeholder="Escriba su reseña" onChange={this.onChange} value={this.state.rev}></textarea>
          <p>
            <button onClick={() => this.setState({show: false})}>Preview</button>
          </p>
        </div> 
      )
    }
    else{
      return(
        <div>
          <text>{this.state.rev}</text>
          <p>
          <button onClick={() => this.setState({show: true})}>Editar</button>
          </p>
        </div>
      )
    }
  }
}


class RateBox extends React.Component{
  
  state={
    show: true,
    valor:''
  }
  
  botoon (num){
    this.setState({valor: num})
  }
  calificar()
  {
    this.setState({show: false})
  }

  render(){

    if(this.state.show){
      return(
        <div>
          <button onClick={() => {this.botoon(1); this.calificar();}}>1</button>
          <button onClick={() => {this.botoon(2); this.calificar();}}>2</button>
          <button onClick={() => {this.botoon(3); this.calificar();}}>3</button>
          <button onClick={() => {this.botoon(4); this.calificar();}}>4</button>
          <button onClick={() => {this.botoon(5); this.calificar();}}>5</button>
        </div>
      )
    }
    else{
      return(
        <div>
        <h4>Su calificación ha sido guardada: {this.state.valor}</h4>
        <button onClick={() => this.setState({show: true})}>Volver atrás</button>
      </div>
      )
      
    }
    
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {/* Edit <code>src/App.js</code> and save to reload.
        <div>
        
        </div>
        */}
          Califique el libro: <RateBox/>
        </p>
        <p>
        Haga una review: <Review/>
        </p>
        {/*
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        */}
      </header>
    </div>
  );
}

export default App;
