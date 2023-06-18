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
  const [categoryInputMode, setCategoryInputMode] = useState(false)
  
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

    if(mode === 'VIEW') {
      setMode('EDIT')
    } else {
      let params = {
        parent : {
          database_id: `${ApiConfig.mainDataBaseId}`
        },
        properties : {
          title: {
            title: [
              {
                text: {
                  content: task.title
                }
              }
            ]
          },
          contents: {
            type: 'rich_text',
            rich_text: [
              {
                text: {
                  content: task.contents
                }
              }
            ]
          }
        }
      }
      ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${task.taskId}`, params).then(res => {
        setMode('VIEW')
      })
    }
  }

  // 진행상태 삭제 함수
  const deleteTask = function(e) {
    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
    }
    ApiUtil.delete(`${ApiConfig.notionDomain}/v1/blocks/${task.taskId}`, params).then(res => {
      // TODO: parent component에 noti 해줘야 함
      alert('삭제되었습니다.')
    })
  }

  const changeTask = function(e, taskField) {
    setTask({ ...task, [taskField]: e.target.value })
  }

  const clickCategory = function(e) {
    setCategoryInputMode(!categoryInputMode)
  }

  const blurCategory = function(e) {
    
    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
      properties : {
        category: {
          select: {
            name: task.category,
          }
        },
      }
    }
    ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${task.taskId}`, params).then(res => {
      setCategoryInputMode(!categoryInputMode)
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
              <input type="text" value={task.title} onChange={(e) => changeTask(e, 'title')} />    
          }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {task.registDt}
        </Typography>
        <Typography variant="body2">
          {mode === 'VIEW' ?
              task.contents :
              <textarea defaultValue={task.contents} onChange={(e) => changeTask(e, 'contents')} />
          }
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
        {categoryInputMode ? <input type="text" value={task.category} className={styles['input-cate']} onChange={(e) => changeTask(e, 'category')} onBlur={blurCategory} /> : <Chip label={task.category} variant="outlined" onClick={clickCategory} />}
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
    // taskId: '',
    taskId: '1f13178d70d34c11b794e8043aaf11c0',
    status: '대기',
    title: 'sss',
    registDt: '',
    contents: 'sssss',
    category: 'saa',
    importYn: 'N',
  }
}

export default BasicCard