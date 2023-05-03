import React from "react";
import styles from '../assets/css/Main.module.css'
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
    return (
          <Container sx={{ m: 10 }}>
              <Box className={MainStyles['task']} >
                <Box className={MainStyles['add']}>
                  <AddIcon/>
                </Box>
                  <Swiper
                      modules={[Navigation, Pagination]}
                      slidesPerView={3}
                      navigation={true}
                      spaceBetween={10}
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                  >
                    <SwiperSlide><Task/></SwiperSlide>
                    <SwiperSlide><Task/></SwiperSlide>
                    <SwiperSlide><Task/></SwiperSlide>
                    <SwiperSlide><Task/></SwiperSlide>
                    <SwiperSlide><Task/></SwiperSlide>

                    <span slot="wrapper-start">start</span>
                    <span slot="wrapper-end">end</span>
                  </Swiper>
              </Box>
          </Container>
    );
}
export default Main;

