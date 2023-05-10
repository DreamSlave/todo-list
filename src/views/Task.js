import * as React from 'react';
// import { useState } from 'react/cjs/react.development'
import { useState } from 'react';
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
import { PropTypes } from 'prop-types';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


function BasicCard({ taskInfo }) {
  
  const [mode, setMode] = useState('VIEW')
  // const [taskInfo, setTaskInfo] = useState({})

  console.log(`taskInfo ::: ${JSON.stringify(taskInfo)}`)

  // TODO : Task info (Props)
  // 아이디, 상태, 제목, 작성일, 컨텐츠, 카테고리, 중요도
  
  /* React.useEffect(() => {
  }, []) */


  return (
    <Card sx={{ minWidth: 275, backgroundColor: (taskInfo.status === '대기' ? '#F5E8C0' : taskInfo.status === '진행' ? '#297CA7' : taskInfo.status === '완료' ? '#0C2426' : '#FFFFFF') }}>
      <CardContent>
        {/* header */}
        <Brightness1Icon sx={{ color: "#F5E8C0", fontSize: 30, border: 'solid', borderColor: 'black' }} />
        <Brightness1Icon sx={{ color: "#297CA7", fontSize: 30, border: 'solid', borderColor: 'black'  }} />
        <Brightness1Icon sx={{ color: "#0C2426", fontSize: 30, border: 'solid', borderColor: 'black'  }} />
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

        {/* body */}
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          {taskInfo.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {taskInfo.registDt}
        </Typography>
        <Typography variant="body2">
          {taskInfo.contents}
          <br />
        </Typography>
      </CardContent>

      {/* bottom */}
      <CardActions>
        {taskInfo.importYn === 'Y' && 
          <img
              alt="Ellipse83218"
              src={FireTaskImg}
              className={styles['ellipse81']}
          />}
        {taskInfo.category && <Chip label={taskInfo.category} variant="outlined" />}
      </CardActions>
    </Card>
  );
}

BasicCard.propTypes = {
  taskInfo: PropTypes.object
}
BasicCard.defaultProps = {
  taskInfo: {
    taskId: 'ID0001',
    status: '진행',
    title: '제목입니다.',
    registDt: '2023/04/17',
    contents: '내용입니다. 내용입니다. 내용입니다.',
    category: '회사업무',
    importYn: 'Y',
  }
}

export default BasicCard