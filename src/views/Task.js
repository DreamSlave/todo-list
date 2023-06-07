import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";
import TaskEditImg from '../assets/imgs/edit_task.png'
import TaskCloseImg from '../assets/imgs/close_task.png'
import TaskConfirmImg from '../assets/imgs/confirm_task.png'
import FireTaskImg from '../assets/imgs/fire_task.png'
import styles from '../assets/css/Task.module.css'
import { PropTypes } from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

/* const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
); */


function BasicCard({ modeProps, taskInfoProps }) {
  
  const [mode, setMode] = useState(modeProps ?? 'VIEW')
  const [task, setTask] = useState(taskInfoProps)
  
  /* React.useEffect(() => {
  }, []) */

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

  // 진행상태 변경 함수
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
    ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${task.taskId}`, params).then(res => {
      setTask({
        ...task,
        status: res.data.properties.status.select.name
      })
    })
  }

  // 모드 변경(VIEW/EDIT)
  const changeMode = function(e) {
    setMode(mode === 'VIEW' ? 'EDIT' : 'VIEW')
  }

  const deleteTask = function(e) {
    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
      /* properties : {
        title: {
          select: {
            name: e.target.textContent,
          }
        },
      } */
    }
    ApiUtil.delete(`${ApiConfig.notionDomain}/v1/blocks/${task.taskId}`, params).then(res => {
      // TODO: parent component에 noti 해줘야 함
      alert('삭제되었습니다.')
    })
  }

  return (
    <Card sx={{ minWidth: 275, backgroundColor: (task.status === '대기' ? '#F5E8C0' : task.status === '진행' ? '#297CA7' : task.status === '완료' ? '#0C2426' : '#FFFFFF') }}>

      mode ::: {mode}
      
      <CardContent>
        {/* header */}
        {/* <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          '& > *': { m: 10 }
        }}
        > */}
        <ThemeProvider theme={statusButtonTheme}>
          <ButtonGroup variant="contained" size="medium" area-label="outlined button group">
            <Button key="대기" color="waiting" onClick={changeStatus}>대기</Button>
            <Button key="진행" color="processing" onClick={changeStatus}>진행</Button>
            <Button key="완료" color="complete" sx={{ color: 'white' }} onClick={changeStatus}>완료</Button>
          </ButtonGroup>
          {/* <ButtonGroup variant="text" size="medium" area-label="text button group" sx={{ textAlign: 'right', marginLeft: '1.5em' }}>
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
          </ButtonGroup> */}

          <Stack direction="row" spacing={0} sx={{ width: '100%' }} justifyContent="flex-end">
            {mode === 'VIEW' ?
              <IconButton aria-label="edit" onClick={changeMode}>
                <img  alt="Ellipse73218"
                      src={TaskEditImg}
                      className={styles['ellipse91']}
                />
              </IconButton> :
              <IconButton aria-label="edit" onClick={changeMode}>
                {/* <DeleteIcon /> */}
                <img  src={TaskConfirmImg}
                      className={styles['ellipse91']}
                />
              </IconButton>
            }
            <IconButton aria-label="delete" onClick={deleteTask}>
              <img  alt="Ellipse83218"
                    src={TaskCloseImg}
                    className={styles['ellipse91']}
              />
            </IconButton>
          </Stack>
        </ThemeProvider>

        {/* body */}
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          {mode === 'VIEW' ?
              task.title :
              <input type="text" value={task.title} />    
          }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {task.registDt}
        </Typography>
        <Typography variant="body2">
          {task.contents}
          <br />
        </Typography>
      </CardContent>

      {/* bottom */}
      <CardActions>
        {task.importYn === 'Y' && 
          <img
              alt="Ellipse83218"
              src={FireTaskImg}
              className={styles['ellipse81']}
          />}
        {task.category && <Chip label={task.category} variant="outlined" />}
      </CardActions>
    </Card>
  );
}

BasicCard.propTypes = {
  modeProps: PropTypes.string,
  taskInfoProps: PropTypes.object
}
BasicCard.defaultProps = {
  modeProps: 'VIEW',
  taskInfoProps: {
    taskId: '68193e914edb4453ae238d4693fa5c4b',
    // taskId: 'fde598874e434fb79e3750bf6ee16519',
    status: '진행',
    title: '오늘..내할일..!',
    registDt: '2023/04/17',
    contents: '내용입니다. 내용입니다. 내용입니다.',
    category: '회사업무',
    importYn: 'Y',
  }
}

export default BasicCard