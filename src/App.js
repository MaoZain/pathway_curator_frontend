import logo from './logo.svg';
import './App.css';

function App() {


  // const headers = new  Headers({
  //   'Access-Control-Allow-Origin':'*',
  //   "Content-Type":'text/plain'
  // })

  // var requestOptions = {
  //   method: 'GET',
  //   // Headers: headers,
  //   // 'mode':'no-cors'
  // };
  // fetch("/back/testcontroller", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          welcome to pathway frontend dev
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
