import * as React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { MainContext } from './Main'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from "@mui/material";
import TaskEditImg from '../assets/imgs/edit_task.png'
// import TaskDeleteImg from '../assets/imgs/delete_task.png'
import TaskConfirmImg from '../assets/imgs/confirm_task.png'
import TaskCancelImg from '../assets/imgs/close_task.png'
import FireTaskImg from '../assets/imgs/fire_task.png'
import styles from '../assets/css/Task.module.css'
import { PropTypes } from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import DeleteIcon from '@mui/icons-material/Delete';

/* const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
); */


function Task({ modeProps, taskInfoProps }) {
  
  const [mode, setMode] = useState(modeProps ?? 'VIEW')
  const [task, setTask] = useState(taskInfoProps)
  const [categoryInputMode, setCategoryInputMode] = useState(false)
  const { fetchData } = useContext(MainContext)

  const statusButtonTheme = createTheme({
    palette: {
      waiting: {
        main: '#F5E8C0'
      },
      processing: {
        main: '#5490A1'
      },
      complete: {
        main: '#798380'
      }
    },
  })

  const bodyTheme = createTheme({
    typography: {
      h5: {},
      body2: {
        color: 'white'
      },
      body3: {
        whiteSpace: 'pre-line',
        margin: 'auto'
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

      if(e.target.parentElement.ariaLabel === 'cancel') {
        if(isEmptyTask()) {
          // 입력한 값이 하나도 없다면 삭제
          deleteTask()
        } else {
          setMode('VIEW')
          return
        }
      } else {
        if(isEmptyTask()) {
          alert('입력된 내용이 없습니다.')
          return false
        }
      }

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
          },
          category: {
            select: {
              name: task.category,
            }
          },
        }
      }
      ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${task.taskId}`, params).then(res => {
        setMode('VIEW')
        if(categoryInputMode) {
          setCategoryInputMode(!categoryInputMode)
        }

        // parent component 함수 호출
        fetchData()
      })
    }
  } 

  // 삭제 함수
  const deleteTask = function(e) {
    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
    }
    ApiUtil.delete(`${ApiConfig.notionDomain}/v1/blocks/${task.taskId}`, params).then(res => {
      // parent component 함수 호출
      fetchData()
    })
  }

  const changeTask = function(e, taskField) {
    setTask({ ...task, [taskField]: e.target.value })
  }

  const clickCategory = function(e) {
    setCategoryInputMode(!categoryInputMode)
  }

  const keyUpCategory = function(e) {

    if(!task.isNew) {
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
  
      if(task.category.trim().length === 0) {
        params['properties'] = undefined
      }
  
      ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${task.taskId}`, params).then(res => {
        setCategoryInputMode(!categoryInputMode)
  
        // parent component 함수 호출
        fetchData()
      })
    }
  }

  // 입력된 task 데이터 존재여부
  const isEmptyTask = function() {
    return task.title.trim() === '' && task.contents.trim() === '' && task.category.trim() === ''
  }


  return (
    <Card sx={{ minWidth: 375, height: 260, padding : '15px' , boxSizing : 'border-box' , backgroundColor: (task.status === '대기' ? '#F5E8C0' : task.status === '진행' ? '#5490A1' : task.status === '완료' ? '#798380' : '#FFFFFF') }}>
      <CardContent sx={{ height: '160px' , padding : '0px'}}>
        {/* header */}
        <ThemeProvider theme={statusButtonTheme}>
          <ButtonGroup variant="contained" size="medium" area-label="outlined button group" sx={{ float: 'left' }}>
            <Button key="대기" color="waiting" onClick={changeStatus}>대기</Button>
            <Button key="진행" color="processing" onClick={changeStatus}>진행</Button>
            <Button key="완료" color="complete" sx={{ color: 'white' }} onClick={changeStatus}>완료</Button>
          </ButtonGroup>

          <Stack direction="row" spacing={0} sx={{ width: 'auto' }} justifyContent="flex-end">
            {mode === 'VIEW' ?
              <Box>
                <IconButton aria-label="edit" onClick={changeMode}>      
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"1"} width="25px" color="#333" stroke="currentColor" className={'w-6 h-6'}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </IconButton>
                <IconButton aria-label="delete" onClick={deleteTask}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"1"} width="25px" color="#333" stroke="currentColor" className={'w-6 h-6'}>
                  <path strokeLinecap={"round"} strokeLinejoin={"round"} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </IconButton>
              </Box> :
              <Box>
                <IconButton aria-label="edit" onClick={changeMode}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"1"} width="25px" color="#333" stroke="currentColor" className={'w-6 h-6'}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                </IconButton>
                <IconButton aria-label="cancel" onClick={changeMode}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"1"} width="25px" color="#333" stroke="currentColor" className={'w-6 h-6'}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </IconButton>
              </Box>
            }
          </Stack>
        </ThemeProvider>

        {/* body */}
        <ThemeProvider theme={bodyTheme}>
        <Typography variant="h5" component="div" sx={{ textAlign: 'left' , fontWeight:'500' , letterSpacing:'-1.5px' , marginTop: '5px' , fontSize: '1.3rem' , height: '30px'}}>
            {/* be{bull}nev{bull}o{bull}lent */}
            {mode === 'VIEW' ?
                task.title :
                <input type="text" placeholder='제목을 입력하세요.' value={task.title} onChange={(e) => changeTask(e, 'title')} style={{height: '30px' , padding:'0' , textAlign: 'left' , fontWeight:'600' , letterSpacing:'-1.5px' , fontSize: '1.3rem' }}/>    
            }
          </Typography>
          <Typography variant="body3" component="div" sx={{ textAlign: 'left', overflow: 'hidden', overflowY: 'auto', height: '55%' , fontSize:'14px' , wordBreak: 'break-all' , maxWidth: '340px' , marginTop: '3px' }}>
            {mode === 'VIEW' ?
                task.contents :
                <textarea defaultValue={task.contents} onChange={(e) => changeTask(e, 'contents')} style={{padding: '0' , width: '100%', height: '95%', border: 'none', background: '#ffffff5e', borderBottom: '1px #999 solid' , resize:'none' }}/>
              }
            <br />
          </Typography>
        </ThemeProvider>
      </CardContent>

      {/* bottom */}
      <CardActions sx={{marginTop: '20px' , padding: '0'}}>
        {task.importYn === 'Y' && 
          <img
              alt="Ellipse83218"
              src={FireTaskImg}
              className={styles['ellipse81']}
          />}
        {categoryInputMode ? 
          <input  type="text"
                  maxLength={10}
                  value={task.category}
                  className={styles['input-cate']}
                  onChange={(e) => changeTask(e, 'category')} onKeyUp={(e) => 
                    { 
                      if((e.keyCode || e.which) === 13) {
                        keyUpCategory(e)
                      }
                    }
          } /> : 
          <Chip label={task.category} variant="outlined" onClick={clickCategory} />}
      </CardActions>
      <Typography sx={{ mb: 1.5, display : 'inline-block', float : 'right' , marginRight : '10px' , color : '#bbb' , marginBottom : '0'}} variant="body2">
            {task.registDt ? task.registDt.substring(0,10) : task.registDt}
      </Typography>
    </Card>
  );
}

Task.propTypes = {
  modeProps: PropTypes.string,
  taskInfoProps: PropTypes.object
}
Task.defaultProps = {
  modeProps: 'VIEW',
  taskInfoProps: {
    taskId: '',
    isNew: false,
    status: '대기',
    title: '',
    registDt: '',
    contents: '',
    category: '',
    importYn: 'N',
  }
}

export default Task