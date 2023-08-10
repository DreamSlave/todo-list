import React, { useState } from 'react';
import Card from "@mui/material/Card";
import '../assets/css/App.css';
import styles from '../assets/css/App.module.css'
import firstStyles from '../assets/css/First.module.css'
import HeaderStyles from "../assets/css/Header.module.css";
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import { useNavigate } from "react-router-dom";
import {Chip} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function First() {
  const movePage = useNavigate();
  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function goMain(){
    movePage('/main');
  }
  function saveTask(){

    if(!title && !contents){
      handleClickOpen()
      return
    }

    let params = {
      parent : {
        database_id: `${ApiConfig.mainDataBaseId}`
      },
      properties : {
        title : {
          title: [
            {
              text: {
                content: `${title}`
              }
            }
          ]
        },
        contents : {
          type: "rich_text",
          rich_text : [
            {
              text: {
                content : `${contents}`
              }
            }
          ]
        },
        status : {
          select: {
            name: `대기`
          }
        },
        importYn : {
          select: {
            name: `Y`
          }
        }
      }
    }
    if(!!category && category !== ''){
      params.properties.category.select.name = category
    }
    ApiUtil.post(`${ApiConfig.notionDomain}/v1/pages`, params).then(function (response){
      if(response.status === 200){
        goMain()
      }else{
        alert('저장실패')
      }
    })
  }
  return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"할 일 또는 비고를 입력해주세요"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <div className={'w50'} style={{ margin :'auto', paddingTop: '10%'}}>
            <span className={'font60 pdb10' + firstStyles['fit']}>첫번째 할 일을 기록해보세요!</span>
            <Card sx={{ width : '100%', marginTop : '10px' }}>
              <div className={'light_yellow pd30'}>
                <div className={'pdt20'}>
                  <input className={HeaderStyles['no-border']}
                         style={{ backgroundColor:'transparent', width : '100%' }}
                         value={title}
                         onChange={(e)=> {
                           e.preventDefault();
                           setTitle(e.target.value)
                         }}
                         maxLength="15"
                         placeholder={'해야할 일을 입력해보세요.'}/>
                </div>
                <div className={'pdt10'}>
                  <textarea className={'w100 '+HeaderStyles['no-border']}
                            style={{ backgroundColor:'transparent', height : '300px', fontSize : '18px', resize : 'none' }}
                            value={contents}
                            onChange={(e)=> {
                              e.preventDefault();
                              setContents(e.target.value)
                            }}
                            maxLength="300"
                            placeholder={'비고를 입력해보세요.'}/>
                </div>

                <div>
                  {
                    isActiveCategory ?
                      <input type="text"
                             value={category}
                             className={styles['input-cate']}
                             onChange={(e) => {
                               e.preventDefault();
                               setCategory(e.target.value)
                             }}
                             maxLength="10"
                             onKeyUp={(e) => {
                               if((e.keyCode || e.which) === 13) {
                                 setIsActiveCategory(false)
                               }
                             }}
                             onBlur={(e)=> setIsActiveCategory(false)}
                      />
                      :
                      <Chip label={category} variant="outlined" onClick={() => setIsActiveCategory(true)}/>
                  }
                </div>
              </div>
            </Card>
          </div>
          <div className={styles['empty'] + ' mgt20'}>
            <button className={styles['orange']} style={{ margin : "auto"}} onClick={(e)=>saveTask()}>입장하기</button>
          </div>
        </div>
      </div>
  );
}
export default First;
