import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress
} from '@mui/material';
import { BASE_URL } from './utils/constantUtils.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './App.css';
import './styles/font-faces.css';
import './styles/globals.css';
import { PATH_DEFAULT } from './utils/constantUtils';
import searchAndConnectBt from './utils/printUtils/searchAndConnectBt';
import { checkIfFullScreen } from './utils/helperUtils';

function App() {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);
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
  }, []);
  /** Safari Desktop 5.1+, Safari Mobile 9.0+ */
  useEffect(() => {
    const docWithBrowsersFullScreenChange = document as Document & {
      onwebkitfullscreenchange: () => void;
    };
    docWithBrowsersFullScreenChange.onwebkitfullscreenchange = () => {
      setIsFullscreen(checkIfFullScreen());
    }
  })
  useEffect(() => {
    window.addEventListener("resize", () => {
      // disable fullscreen check for screen resolution bigger than mobile resolution
      setIframeHeight(window.innerHeight)
    });
    return window.removeEventListener('resize', () => {});
  }, [])
  return (
    <div
      className="App">
      <Header
        label="Orders"
        burger={burger}
        isFullscreen={isFullscreen}
        goback={goback}
      />
      {
        loading &&
        <Box
          sx={{
            position: "absolute",
            top: "41px",
            right: "0px",
            bottom: "80px",
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
          height: `${iframeHeight
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
