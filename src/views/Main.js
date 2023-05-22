import React from "react";
import { Container, InputAdornment, TextField, Button, Chip, Box} from "@mui/material";
import { useState } from "react";
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
  return (
      <Container sx={{textAlign: 'center'}} maxWidth={false}>
        <Box sx={{ backgroundColor: '#FFFFFF', height:84, maxWidth:1376 }} >
        </Box>
        <TaskList></TaskList>
        <SearchBar>
        </SearchBar>
        <TaskList></TaskList>
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


function TaskList() {
  const todos = [
    { taskId: "1", title: "공부" },
    { taskId: "2", title: "헬스" },
    { taskId: "3", title: "독서" },
    { taskId: "4", title: "산책" },
    { taskId: "5", title: "요리" }
  ];
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

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
                droppableId="cards"
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
              <Droppable droppableId="cards" key="cards" direction="horizontal">
                {(provided, snapshot) => (
                  <div className="cards" {...provided.droppableProps} ref={provided.innerRef} >
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={3}
                        navigation={true}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                      {todos.map((item, index)  =>
                        <Draggable draggableId={item.taskId} index={index} id={item.taskId} key={item.taskId}>
                          {(provided, snapshot) =>
                              <span className={MainStyles['card']} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <SwiperSlide >
                                <div>{item.title}</div>
                                {/*<Task/>*/}
                                </SwiperSlide>
                              </span>

                          }
                        </Draggable>
                    )}
                      <span slot="wrapper-start">start</span>
                      <span slot="wrapper-end">end</span>
                    </Swiper>
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

