import React from 'react';
import { Box, Typography } from "@mui/material";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { PATH_DEFAULT } from '../utils/constantUtils';

interface BurgerProps {
  burger: () => void
}

const Burger = ({ burger }: BurgerProps) => (
  <Box
    sx={{
      cursor: "pointer",
      userSelect: "none",
      padding: "4px",
      margin: "4px 0px",
      lineHeight: 0,
      backgroundColor: "var(--white-X00)"
    }}
    onClick={burger}>
    <MenuRoundedIcon htmlColor="var(--gray-hard-500)"/>
  </Box>
)

interface GoBackProps {
  setRoute: (v: any) => void
}

const GoBack = ({ setRoute }: GoBackProps) => (
  <Box
    sx={{
      cursor: "pointer",
      userSelect: "none",
      padding: "2px",
      margin: "6px 0px",
      borderRadius: "6px",
      lineHeight: 0,
      backgroundColor: "var(--gray-hard-500)"
    }}
    onClick={e => {
      var defaultLocation = PATH_DEFAULT;
      var oldHash = window.location.hash;
  
      // eslint-disable-next-line no-restricted-globals
      history.back();
  
      var newHash = window.location.hash;
  
      /* If the previous page hasn't been loaded in a given time (in this case
      * 1000ms) the user is redirected to the default location given above.
      * This enables you to redirect the user to another page.
      */
  
      if(
        newHash === oldHash &&
        (typeof(document.referrer) !== "string" || document.referrer  === "")
      ){
        window.setTimeout(function(){
          // redirect to default location
          window.location.href = defaultLocation;
        }, 1000); // set timeout in ms
      }
      if(e){
        if(e.preventDefault)
          e.preventDefault();
        // if(e.preventPropagation)
        //   e.preventPropagation();
      }
      setRoute(null)
    }}>
    <ChevronLeftOutlinedIcon htmlColor="var(--white-X00)"/>
  </Box>
)

interface HeaderProps {
  label: string
  burger: () => void
  setRoute: (v: any) => void
}

export default function Header({ label, burger, setRoute }: HeaderProps) : JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0px 12px"
      borderBottom="1px solid #DDD">
      <Burger burger={burger} />
      <Box>
        <Typography
          fontSize="0.8rem"
          lineHeight="0.8rem"
          fontFamily="DM Sans"
          color="var(--black-500)"
        >flooke</Typography>
        <Typography
          fontSize="1.2rem"
          fontWeight="600"
          lineHeight="1rem"
          fontFamily="DM Sans"
        >{label}</Typography>
      </Box>
      <GoBack setRoute={setRoute} />
    </Box>
  );
}