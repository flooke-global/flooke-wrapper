import React, { useState } from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import {
  PATH_DASHBOARD,
  PATH_ITEM_EDITOR,
  PATH_DEFAULT,
  PATH_SETTINGS,
  PATH_FAQS
} from '../utils/constantUtils';

interface BottomClickProps {
  Icon: any
  extemeLeft?: boolean
  isLeft?: boolean
  active?: boolean
  isRight?: boolean
  extemeRight?: boolean
  click: () => void
}

const BottomClick = ({
  Icon,
  extemeLeft=false,
  isLeft=false,
  active=false,
  isRight=false,
  extemeRight=false,
  click
}: BottomClickProps): JSX.Element => (
  <Box
    position="relative">
    <Box
      height="4rem"
      width={active ? "4rem" : "5rem"}
      bgcolor={active ? "var(--primary-purple)" : "var(--primary-yellow)"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: active && "absolute",
        bottom: active && "1rem",
        right: extemeLeft && "0px",
        left: extemeRight && "0px",
        border: active && "0.5rem solid #FFF",
        borderRadius: active && "4rem",
        borderTopLeftRadius: extemeLeft ? "4rem" : isRight && "18px",
        borderTopRightRadius: extemeRight ? "4rem" : isLeft && "18px",
        borderBottomLeftRadius: extemeLeft && "4rem",
        borderBottomRightRadius: extemeRight && "4rem",
      }}
      onClick={click}>
      <IconButton>
        {<Icon htmlColor={active ? "var(--white-X00)" : "var(--black-X00)"} />}
      </IconButton>
    </Box>
    {
      active &&
      <Box
        display="flex"
        alignItems="flex-end">
        <Box
          height={extemeLeft ? "1rem" : "3rem"}
          width="2rem"
          // width={(extemeRight || extemeLeft) && active ? "4rem" : "4rem"}
          bgcolor="var(--primary-yellow)"
          sx={{
            borderTopLeftRadius: extemeLeft && active ? "0.8rem" : null,
            borderBottomLeftRadius: extemeLeft && active ? "0.8rem" : null
          }}
        />
        <Box
          height={extemeRight ? "1rem" : "3rem"}
          width="2rem"
          bgcolor="var(--primary-yellow)"
          sx={{
            borderTopRightRadius: extemeRight && active ? "0.8rem" : null,
            borderBottomRightRadius: extemeRight && active ? "0.8rem" : null
          }}>

        </Box>
      </Box>
    }
  </Box>
)

const bottomNav = [
  [
    "active",
    "isRight",
    null,
    null,
    null
  ],
  [
    "isLeft",
    "active",
    "isRight",
    null,
    null
  ],
  [
    null,
    "isLeft",
    "active",
    "isRight",
    null
  ],
  [
    null,
    null,
    "isLeft",
    "active",
    "isRight"
  ],
  [
    null,
    null,
    null,
    "isLeft",
    "active"
  ]
];

const icons = [
  DashboardRoundedIcon,
  BusinessCenterRoundedIcon,
  NoteAltRoundedIcon,
  SettingsRoundedIcon,
  HeadsetMicRoundedIcon
];

const routes = [
  PATH_DASHBOARD,
  PATH_ITEM_EDITOR,
  PATH_DEFAULT,
  PATH_SETTINGS,
  PATH_FAQS
]

interface FooterProps {
  goto: (path: string) => void
}

export default function Footer({ goto }: FooterProps) : JSX.Element{
  const [active, setActive] = useState(2);
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
      {
        bottomNav[active].map((each, index) => 
          <BottomClick
            Icon={icons[index]}
            extemeLeft={index === 0}
            isLeft={each === "isLeft"}
            active={each === "active"}
            isRight={each === "isRight"}
            extemeRight={index === 4}
            click={() => {
              setActive(index)
              goto(routes[index])
            }}
          />
        )
      }
    </Box>
  )
}