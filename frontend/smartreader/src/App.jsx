import React from 'react'
import ReactDOM from 'react-dom/client'

function App(){
  const [msg, setMsg] = React.useState("")

  React.useEffect(()=>{
    fetch("http://localhost:5000/api/example")
      .then(res =>res.json())
      .then(data=>setMsg(data.message));
  }, []);

  return <h1>{msg}</h1>;
}

export default App;

