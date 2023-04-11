import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import TaskEditImg from '../assets/imgs/edit_task.png'
import TaskCloseImg from '../assets/imgs/close_task.png'
import FireTaskImg from '../assets/imgs/fire_task.png'
import styles from '../assets/css/Task.module.css'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#297CA7' }}>
      <CardContent>
        {/* header */}
        <Brightness1Icon sx={{ color: "#FFFFFF", fontSize: 30 }} />
        <Brightness1Icon sx={{ color: "#2400FF", fontSize: 30 }} />
        <Brightness1Icon sx={{ color: "#787878", fontSize: 30 }} />
        <div className={styles['header-btn-wrap']}>
          <img
              alt="Ellipse73218"
              src={TaskEditImg}
              className={styles['ellipse71']}
          />
          <img
              alt="Ellipse83218"
              src={TaskCloseImg}
              className={styles['ellipse81']}
          />
        </div>

        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          리액트 마스터하기
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          2023.04.07
        </Typography>
        <Typography variant="body2">
          1. 리액트로 프로그래밍하기 책 정독<br/>
          2. vscode vs intellij 결정
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
        <img
            alt="Ellipse83218"
            src={FireTaskImg}
            className={styles['ellipse81']}
        />
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
        <Chip label="Chip Outlined" variant="outlined" />
      </CardActions>
    </Card>
  );
}