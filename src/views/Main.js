import React from "react";
import { Container, InputAdornment, TextField, Button, Chip, Box} from "@mui/material";
import { useState, useEffect, createContext, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import MainStyles from "../assets/css/Main.module.css";
import Task from "./Task"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const MainContext = createContext();

async function getTaskList() {
    let taskArray = []
    await ApiUtil.post(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}/query`).then(function (response) {
        if (response.status === 200) {
            response.data.results.forEach(notionTask => {
                let taskInfo = {
                    viewMode : 'VIEW',
                    taskId: notionTask.id,
                    status: notionTask.properties.status.select?.name,
                    title: notionTask.properties.title.title[0]?.plain_text,
                    registDt: notionTask.properties.registDt.created_time,
                    contents: notionTask.properties.contents.rich_text[0]?.plain_text,
                    category: notionTask.properties.category.select?.name,
                    importYn: notionTask.properties.importYn.select?.name
                }
                taskArray.push(taskInfo)
            })
        }
    })
    return taskArray
}

async function fetchData(setTodos, setTags, setEnabled) {
  const result = await getTaskList()
  setTodos( result)
  let filterTags = result.map(item => item.category).filter(categoryStr => !!categoryStr && categoryStr!=='')
  setTags( [...new Set(filterTags)] )
  setEnabled(true);
}

function Main() {

  let [todos, setTodos] = useState([])
  let [tags, setTags] = useState([])

  const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        fetchData(setTodos, setTags, setEnabled);
    },[]);

  function updateTaskList (result){
    setTodos(result)
  }
  if (!enabled) {
    return null;
  }


  return (
      <div style={{textAlign: 'center', width : '100%' }}>
        <MainContext.Provider value={{setTodos, setTags, setEnabled}}>
          <SearchBar tags={tags}  todos={todos} updateTaskList ={updateTaskList} >
          </SearchBar>
          <TaskList id="important" todos={todos} updateTaskList ={updateTaskList}/>
        </MainContext.Provider>
        {/*<Box sx={{ backgroundColor: '#FFFFFF', height:84, maxWidth:1376 }} >*/}
        {/*</Box>*/}
        

        {/*<TaskList id="normal" importYn="N" todos={todos} updateTaskList ={updateTaskList}></TaskList>*/}
      </div>
  );
}
function SearchTag({tags, todos, updateTaskList}){
  function chipFilter(item){
    const result = todos.filter(todo => todo.category === item)
    updateTaskList(result)
  }
  return (
      <div
          style={{
            height: '31px',
            padding: '10px',
            textAlign:'left',
            marginLeft:'50px'
          }}
      >

        {tags.map((element, index) =>(
            <Chip label={element} onClick={() => chipFilter(element)} key={index} clickable />
          ))}
        {/*<Chip label="Chip Filled" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
        {/*<Chip label="Chip Filled" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
      </div>
  );
}
function SearchBar({tags, todos, updateTaskList}) {
  const { setTodos, setTags, setEnabled } = useContext(MainContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function onClickClear(){
    fetchData(setTodos, setTags, setEnabled)
    setSearchTerm("")
  }
  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      const result = todos.filter(todo => (todo.title.includes(searchTerm)  || todo.contents.includes(searchTerm)))
      updateTaskList(result)
    }
  }
  function onClickSearch(){
    const result = todos.filter(todo => (todo.title.includes(searchTerm)  || todo.contents.includes(searchTerm)))
    updateTaskList(result)
  }

  return (
      <Container maxWidth="md" sx={{ m: 5 }}>
        <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
              ),
            }}
        />
        <Button variant="Search" onClick={onClickSearch}>검색</Button>
        <Button variant="Clear" onClick={onClickClear}>초기화</Button>
        <SearchTag tags={tags} todos={todos} updateTaskList ={updateTaskList}></SearchTag>
      </Container>
  );
}


function TaskList({id, importYn, todos, updateTaskList}) {
  const [task, setTask] = useState({})
  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log("::result::",result)
    let newTodoList = [...todos]
    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result;

    const sourceData = todos[source.index];
    if(source.droppableId !== destination.droppableId){
      //import 넘기는 로직 추가
      let params = {
        parent : {
          database_id: `${ApiConfig.mainDataBaseId}`
        },
        properties : {
          importYn: {
            select: {
              name: destination.droppableId,
            }
          },
        }
      }
      ApiUtil.patch(`${ApiConfig.notionDomain}/v1/pages/${result.draggableId}`, params).then(res =>{
        
        //const data = newTodoList.find(item => item.taskId === result.draggableId)
      })

    }else{
      const [reorderedItem] = newTodoList.splice(source.index, 1);
      newTodoList.splice(destination.index, 0, reorderedItem);
    }

    updateTaskList(newTodoList)

  }
  const onDragStart = () => {
    //드래그 시작하면 할일
    //console.log("::onDragStart::")
  }
    function saveTask(importYn){
        let params = {
            parent : {
                database_id: `${ApiConfig.mainDataBaseId}`
            },
            properties : {
                title : {
                    title: [
                        {
                            text: {
                                content: ``
                            }
                        }
                    ]
                },
                contents : {
                    type: "rich_text",
                    rich_text : [
                        {
                            text: {
                                content : ``
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
                        name: importYn
                    }
                }
            }
        }
        ApiUtil.post(`${ApiConfig.notionDomain}/v1/pages`, params).then(async function (response) {
            if (response.status === 200) {
                let getUpdateTaskList = await getTaskList()
                let newTaskId = response.data.id
                let findIndex = getUpdateTaskList.findIndex(task=>task.taskId===newTaskId)
                getUpdateTaskList[findIndex].viewMode='EDIT'
                updateTaskList(getUpdateTaskList)
            } else {
                alert('저장실패')
            }
        })
    }

  const [importantList, seImportantList] = useState([
    { id: 0, value: 'Y' },
    { id: 1, value: 'N' },
  ]);
  return (
      <div >
        <DragDropContext
                droppableId={importYn}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
              <div style={{width : '100%'}}>
                <Droppable droppableId="important" type="droppableItem">
                  {(provided) => (
                      <div ref={provided.innerRef}>
                        {importantList.map((importItem, index) => (
                            <Draggable
                                draggableId={importItem.value} id={importItem.value} key={importItem.value} index={index}
                            >
                              {(parentProvider) => (
                                  <div className={importItem.value ==='Y' ? MainStyles['task_import'] : MainStyles['task']}
                                      ref={parentProvider.innerRef}
                                      {...parentProvider.draggableProps}
                                      {...parentProvider.dragHandleProps}
                                  >
                                    <Box className={MainStyles['add']} >
                                      <span className={MainStyles['add_icon']}  onClick={(e)=>saveTask(importItem.value )}><AddIcon/></span>
                                    </Box>
                                    <Droppable droppableId={importItem.value} key="cards" direction="horizontal">
                                      {(provided, snapshot) => (
                                          <div className={MainStyles['task_inner']}  {...provided.droppableProps}  ref={provided.innerRef} >
                                            {todos
                                            .filter((item) => item.importYn === importItem.value)
                                            .map((item, index)  =>
                                              <Draggable draggableId={item.taskId} index={index} id={item.taskId} key={item.taskId}>
                                                {(provided, snapshot) =>
                                                    <span className={MainStyles['card']} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                      {<Task
                                                          modeProps={item.viewMode}
                                                          taskInfoProps={item}
                                                      />}
                                                      {index}
                                                    </span>
                                                }
                                              </Draggable>
                                            )}
                                            {provided.placeholder}
                                          </div>
                                      )}
                                    </Droppable>

                                </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                  )}
                </Droppable>
              </div>

            </DragDropContext>
      </div>

  );
}
export default Main;

