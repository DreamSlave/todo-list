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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Main() {
  const [todos, setTodos] = useState([
    { taskId: "1", title: "공부" ,important: "Y"},
    { taskId: "2", title: "헬스" ,important: "Y"},
    { taskId: "3", title: "독서" ,important: "Y"},
    { taskId: "4", title: "산책" ,important: "Y"},
    { taskId: "5", title: "요리" ,important: "Y" },
    { taskId: "6", title: "not1" ,important: "N" },
    { taskId: "7", title: "not2" ,important: "N" },
    { taskId: "8", title: "not3" ,important: "N" },
  ])
  return (
      <Container sx={{textAlign: 'center'}} maxWidth={false}>
        <Box sx={{ backgroundColor: '#FFFFFF', height:84, maxWidth:1376 }} >
        </Box>
        <TaskList id="important" todos={todos.filter(item => item.important ==='Y')} setTodos ={setTodos}></TaskList>
        <SearchBar>
        </SearchBar>
        <TaskList id="normal" todos={todos.filter(item => item.important !=='Y')} setTodos ={setTodos}></TaskList>
      </Container>
  );
}
function SearchTag(){
  return (
      <Box
          p={2}
          sx={{
            height: 31,
          }}
      >
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
        <Chip label="Chip Outlined" variant="outlined" />
      </Box>
  );
}
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
        <Button variant="Search">Contained</Button>
        <SearchTag></SearchTag>
      </Container>
  );
}


function TaskList({id, todos, setTodos}) {

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log('result ? ', result);

    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result;

    setTodos((prev) =>{
      const sourceData = todos[source.index];
      let newDatas= prev;
      newDatas.splice(source.index, 1);
      newDatas.push(destination.index, 0, sourceData);

      return newDatas;
    })
    //드래그 끝나면 할일
    console.log("::onDragEnd::")
  }
  const onDragStart = () => {
    //드래그 시작하면 할일
    console.log("::onDragStart::")
  }
  return (

      <Container sx={{ m: 10 }}>
        <Box className={MainStyles['task']} >
          <Box className={MainStyles['add']}>
            <AddIcon/>
          </Box>
            <DragDropContext
                droppableId={id}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
              <Droppable droppableId={id} key="cards" direction="horizontal">
                {(provided, snapshot) => (
                  <div className="cards" {...provided.droppableProps} ref={provided.innerRef} >
                      {todos.map((item, index)  =>
                        <Draggable draggableId={item.taskId} index={index} id={item.taskId} key={item.taskId}>
                          {(provided, snapshot) =>
                              <span className={MainStyles['card']} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div>{item.title}</div>
                                {/*<Task/>*/}
                              </span>
                          }
                        </Draggable>
                    )}
                    {provided.placeholder}
                  </div>

                )}
              </Droppable>
            </DragDropContext>
        </Box>
      </Container>

  );
}
export default Main;

