import React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { openFullscreen, closeFullscreen } from '../utils/helperUtils';

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
  goback: () => void
}

const GoBack = ({ goback }: GoBackProps) => (
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
    onClick={goback}>
    <ChevronLeftOutlinedIcon htmlColor="var(--white-X00)"/>
  </Box>
)

interface HeaderProps {
  label: string
  isFullscreen: boolean
  burger: () => void
  goback: () => void
}

export default function Header({ label, isFullscreen, burger, goback }: HeaderProps) : JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0px 12px"
      borderBottom="1px solid #DDD">
      <Box
        display="flex">
        {/* <Burger burger={burger} /> */}
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
          onClick={() => {
            if(!isFullscreen) openFullscreen()
            else closeFullscreen()
          }}>
          {
            isFullscreen ? <FullscreenExitIcon htmlColor="var(--white-X00)" />
            : <FullscreenIcon htmlColor="var(--white-X00)" />
          }
        </Box>
      </Box>
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
      <GoBack goback={goback} />
    </Box>
  );
}