import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText,  } from '@mui/material';
import { BASE_URL } from './utils/constantUtils.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './App.css';
import './styles/font-faces.css';
import './styles/globals.css';
import { PATH_DEFAULT } from './utils/constantUtils';

function App() {
  const [route, setRoute] = useState(PATH_DEFAULT);
  const burger = () => console.log('burger called');
  const goto = (path: string) => {
    setRoute(path);
  }
  return (
    <div
      className="App">
      <Dialog
        open
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Header
        label="Orders"
        burger={burger}
        setRoute={setRoute}
      />
      <iframe
        id="flooke-main-case"
        src={BASE_URL+route}
        title="flooke"
        style={{
          display: "block",
          width: "100vw",
          height: `${window.innerHeight
            - 41 //Header height
            - 80 //Footer height
            - 10 //Footer bottom margin
          }px`,
          border: "none",
          overflowY: "hidden",
          padding: 0,
          margin: 0
        }}
      ></iframe>
      <Footer goto={goto}/>
    </div>
  );
}

export default App;
