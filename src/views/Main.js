import React from "react";
import { Container, InputAdornment, TextField, Button, Chip, Box} from "@mui/material";
import { useState, useEffect } from "react";
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

function Main() {

  let [todos, setTodos] = useState([])
  let [tags, setTags] = useState([])

  const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        async function fetchData() {
          const result = await getTaskList()
          setTodos( result)
          setTags( result.filter(item => item.category !== undefined).map(item => {return {category : item.category}}))
          setEnabled(true);
        }
        fetchData();

    },[]);

  function updateTaskList (result){
    setTodos(result)
  }
  if (!enabled) {
    return null;
  }


  return (
      <Container sx={{textAlign: 'center'}} maxWidth={false}>
        <Box sx={{ backgroundColor: '#FFFFFF', height:84, maxWidth:1376 }} >
        </Box>
        <SearchBar tags={tags}  todos={todos} updateTaskList ={updateTaskList}>
        </SearchBar>
        <TaskList id="important" todos={todos} updateTaskList ={updateTaskList}/>

        {/*<TaskList id="normal" importYn="N" todos={todos} updateTaskList ={updateTaskList}></TaskList>*/}
      </Container>
  );
}
function SearchTag({tags, todos, updateTaskList}){
  function chipFilter(item){
    const result = todos.filter(todo => todo.category === item.category)
    console.log(":result",result)
    updateTaskList(result)
  }
  return (
      <Box
          p={2}
          sx={{
            height: 31,
          }}
      >

        {tags.map((element, index) =>(
            <Chip label={element.category} onClick={() => chipFilter(element)} key={index} clickable />
          ))}
        {/*<Chip label="Chip Filled" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
        {/*<Chip label="Chip Filled" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
        {/*<Chip label="Chip Outlined" variant="outlined" />*/}
      </Box>
  );
}
function SearchBar({tags, todos, updateTaskList}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  function onClickClear(){
    console.log("todos",todos)
    updateTaskList(todos)
  }

  return (
      <Container maxWidth="md" sx={{ m: 10 }}>
        <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
              ),
            }}
        />
        <Button variant="Search">검색</Button>
        <Button variant="Clear" onClick={onClickClear}>초기화</Button>
        <SearchTag tags={tags} todos={todos} updateTaskList ={updateTaskList}></SearchTag>
      </Container>
  );
}


function TaskList({id, importYn, todos, updateTaskList}) {

  const onDragEnd = (result) => {
    if (!result.destination) return;
    // console.log("::column::",column)
    let newTodoList = [...todos]
    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result;

    const sourceData = todos[source.index];

    if(source.droppableId !== destination.droppableId){
      //import 넘기는 로직 추가
      console.log("import 변화해야함")

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
    function saveTask(importYn = 'N'){
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

      <Container sx={{ m: 10 }}>
        <Box className={MainStyles['task']} >
            <DragDropContext
                droppableId={importYn}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
              <div>
                <Droppable droppableId="important" type="droppableItem">
                  {(provided) => (
                      <div ref={provided.innerRef}>
                        {importantList.map((importItem, index) => (
                            <Draggable
                                draggableId={importItem.value} id={importItem.value} key={importItem.value} index={index}
                            >
                              {(parentProvider) => (
                                  <div
                                      ref={parentProvider.innerRef}
                                      {...parentProvider.draggableProps}
                                      {...parentProvider.dragHandleProps}
                                  >
                                    <Box className={MainStyles['add']}>
                                      <span onClick={(e)=>saveTask()}><AddIcon/></span>
                                    </Box>
                                    <Droppable droppableId={importItem.value} key="cards" direction="horizontal">
                                      {(provided, snapshot) => (
                                          <div className="cards" {...provided.droppableProps}  ref={provided.innerRef} >
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
        </Box>
      </Container>

  );
}
export default Main;

