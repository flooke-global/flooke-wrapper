import React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import { PATH_DEFAULT, PATH_ITEM_EDITOR } from '../utils/constantUtils';

interface FooterProps {
  goto: (path: string) => void
}

export default function Footer({ goto }: FooterProps) : JSX.Element{
  return (
    <Box
      height="5rem"
      display="flex"
      alignItems="flex-end"
      position="absolute"
      left="50%"
      bottom={10}
      sx={{
        transform: "translateX(-50%)"
      }}>
      <Box
        height="4rem"
        width="5rem"
        bgcolor="var(--primary-yellow)"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "4rem",
          borderBottomLeftRadius: "4rem"
        }}>
        <IconButton>
          <DashboardRoundedIcon htmlColor="var(--black-X00)" />
        </IconButton>
      </Box>
      <Box
        height="4rem"
        width="5rem"
        bgcolor="var(--primary-yellow)"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: "18px"
        }}
        onClick={() => goto(PATH_ITEM_EDITOR)}>
        <IconButton>
          <BusinessCenterRoundedIcon htmlColor="var(--black-X00)" />
        </IconButton>
      </Box>
      <Box
        position="relative">
        <Box
          position="absolute"
          bottom="1rem"
          height="4rem"
          width="4rem"
          bgcolor="var(--primary-purple)"
          border="0.5rem solid #FFF"
          borderRadius="4rem"
          zIndex="1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => goto(PATH_DEFAULT)}
        >
          <IconButton>
            <NoteAltRoundedIcon htmlColor="var(--white-X00)" />
          </IconButton>
        </Box>
        <Box
          height="3rem"
          width="4rem"
          bgcolor="var(--primary-yellow)"
        />
      </Box>
      <Box
        height="4rem"
        width="5rem"
        bgcolor="var(--primary-yellow)"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "20px"
        }}>
        <IconButton>
          <SettingsRoundedIcon htmlColor="var(--black-X00)" />
        </IconButton>
      </Box>
      <Box
        height="4rem"
        width="5rem"
        bgcolor="var(--primary-yellow)"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: "4rem",
          borderBottomRightRadius: "4rem"
        }}>
        <IconButton>
          <HeadsetMicRoundedIcon htmlColor="var(--black-X00)" />
        </IconButton>
      </Box>
    </Box>
  )
}