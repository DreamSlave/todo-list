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
import ButtonGroup from '@mui/material/ButtonGroup'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";

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
  
  /* React.useEffect(() => {
  }, []) */
  const statusButtonBasicStyles = {
    bgcolor: 'backgroud.paper',
    borderColor: 'text.primary',
    borderRadius: '50%',
    m: 1,
    border: 1,
    width: '1.5rem',
    height: '1.5rem'
  }

  const statusButtonTheme = createTheme({
    palette: {
      waiting: {
        main: '#F5E8C0'
      },
      processing: {
        main: '#297CA7'
      },
      complete: {
        main: '#0C2426'
      }
    }
  })

  const changeStatus = function(e) {

    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
      properties : {
        status: {
          select: {
            name: e.target.textContent,
          }
        },
      }
    }
    ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${taskInfo.taskId}`, params).then(res => {
      // console.log(`here ::: ${JSON.stringify(res)}`)
      taskInfo.status = res.data.properties.status.select.name
      console.log(`조회된 status ::: ${res.data.properties.status.select.name}`)
    })
  }


  return (
    <Card sx={{ minWidth: 275, backgroundColor: (taskInfo.status === '대기' ? '#F5E8C0' : taskInfo.status === '진행' ? '#297CA7' : taskInfo.status === '완료' ? '#0C2426' : '#FFFFFF') }}>
      <CardContent>
        {/* header */}
        {/* <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          '& > *': { m: 10 }
        }}
        > */}
        {taskInfo.status}
        <ThemeProvider theme={statusButtonTheme}>
          <ButtonGroup variant="contained" size="medium" area-label="outlined button group">
            <Button key="대기" color="waiting" onClick={changeStatus}>대기</Button>
            <Button key="진행" color="processing" onClick={changeStatus}>진행</Button>
            <Button key="완료" color="complete" sx={{ color: 'white' }} onClick={changeStatus}>완료</Button>
          </ButtonGroup>
          <ButtonGroup variant="text" size="medium" area-label="text button group" sx={{ textAlign: 'right', marginLeft: '1.5em' }}>
            <Button key="editButton" color="waiting">
              <img  alt="Ellipse73218"
                    src={TaskEditImg}
                    className={styles['ellipse71']}
              />
            </Button>
            <Button key="deleteButton" color="complete">
              <img  alt="Ellipse83218"
                    src={TaskCloseImg}
                    className={styles['ellipse81']}
              />
            </Button>
          </ButtonGroup>
        </ThemeProvider>
        {/* </Box> */}
        {/* <Box sx={{ ...statusButtonBasicStyles, bgcolor: '#F5E8C0' }} />
        <Box sx={{ ...statusButtonBasicStyles, bgcolor: '#297CA7' }} />
        <Box sx={{ ...statusButtonBasicStyles, bgcolor: '#0C2426' }} /> */}
        {/* <Brightness1Icon sx={{ color: "#F5E8C0", fontSize: 30, border: 1, borderColor: 'black' }} />
        <Brightness1Icon sx={{ color: "#297CA7", fontSize: 30, border: 1, borderColor: 'black'  }} />
        <Brightness1Icon sx={{ color: "#0C2426", fontSize: 30, border: 1, borderColor: 'black'  }} /> */}
        {/* <div className={styles['header-btn-wrap']}>
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
        </div> */}

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
    taskId: '68193e914edb4453ae238d4693fa5c4b',
    // taskId: 'fde598874e434fb79e3750bf6ee16519',
    status: '진행',
    title: '제목입니다.',
    registDt: '2023/04/17',
    contents: '내용입니다. 내용입니다. 내용입니다.',
    category: '회사업무',
    importYn: 'Y',
  }
}

export default BasicCard