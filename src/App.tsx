import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { BASE_URL } from './utils/constantUtils.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './App.css';
import './styles/font-faces.css';
import './styles/globals.css';
import { PATH_DEFAULT } from './utils/constantUtils';
import { openFullscreen, closeFullscreen } from './utils/helperUtils.ts';

function App() {
  const [route, setRoute] = useState(PATH_DEFAULT);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }   
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  const burger = () => console.log('burger called');
  const goto = (path: string) => {
    setRoute(path);
  }
  return (
    <div
      className="App">
      <Dialog
        open={!isFullscreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="DM Sans">
          {"Don't be a tool!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            fontFamily="DM Sans">
            Make the most of this, you need to use it in full screen view.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "DM Sans"
            }}
            onClick={() => openFullscreen()}>
            Full View
          </Button>
        </DialogActions>
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
