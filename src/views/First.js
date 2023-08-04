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

function First() {
  const movePage = useNavigate();
  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  function goMain(){
    movePage('/main');
  }
  function saveTask(){
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
        },
        category : {
          select: {
            name: `${category}`
          }
        },
      }
    }
    ApiUtil.post(`${ApiConfig.notionDomain}/v1/pages`, params).then(function (response){
      if(response.status === 200){
        goMain()
      }else{
        alert('저장실패')
      }
    })
  }
  function getLog() {
    console.log("Hi there, user!");
  }
  return (
      <div>
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
