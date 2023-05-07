import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { BASE_URL } from './utils/constantUtils.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './App.css';
import './styles/font-faces.css';
import './styles/globals.css';
import { PATH_DEFAULT } from './utils/constantUtils';
import { openFullscreen } from './utils/helperUtils.ts';
import searchAndConnectBt from './utils/printUtils/searchAndConnectBt';

function App() {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState(PATH_DEFAULT);
  const [routeHistory, setRouteHistory] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const goback = () => {
    const _routeHistory = [...routeHistory];
    setLoading(true);
    if(routeHistory.length === 0) {
      setRoute(PATH_DEFAULT);
    }
    else {
      setRoute(_routeHistory[0]);
    }
    setRouteHistory(_routeHistory.slice(1, _routeHistory.length));
  }
  const goto = (path: string) => {
    const _routeHistory = [...routeHistory];
    _routeHistory.unshift(route);
    if(path !== route) setLoading(true);
    setRouteHistory(_routeHistory);
    setRoute(path);
  }
  const burger = () => console.log('burger called');
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }   
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', () => setLoading(false));
    }
  }, []);
  useEffect(() => {
    window.addEventListener('message', event => {
      console.log(event);
      // IMPORTANT: checking the origin of the data!
      if (event.origin === BASE_URL) {
        // The data was sent from flooke orders, reads the first data
        if("print" === event.data?.method) {
          searchAndConnectBt(event.data?.content)
        }
        if("navigate" === event.data?.method) {
          goto(event.data?.content)
        }
      }
    });
    return window.removeEventListener('message', event => {});
  });
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
            To make the most of this, you need to use it in full screen view.
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
        goback={goback}
      />
      {
        loading &&
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D5D5D588"
          }}>
          <CircularProgress />
        </Box>
      }
      <iframe
        id="flooke-main-case"
        ref={iframeRef}
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
