import React from "react";
import styles from '../assets/css/Main.module.css'
import { Container, InputAdornment, TextField, Button, Chip, Box} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@material-ui/core/styles";
import Task from "./Task"
const useStyles = makeStyles({
  add: {
    "vertical-align": "middle",
    "text-align": "center",
    "width":"36px",
    "height":"252px",
    "background-color":"#FD966B"
  },
  task: {
    "display": "inline-flex",
    "vertical-align": "middle",
    "justify-content":"space-around",
    "text-align": "center",
    "background-color":"#FEE09A",
    "width":"1376px",
    "height":"304px",
    "padding": 2,
  },

});

function Main() {
  return (
    <Container>
        <Box sx={{ bgcolor: '#FFFFFF', height:84, maxWidth:1376 }} >
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
            <SearchTag></SearchTag>
        </Container>
    );
}
function TaskList() {
    const classes = useStyles();
    return (
        <Container sx={{ m: 10 }}>
            <Box className={classes.task} >
              <Box className={classes.add} >
                <AddIcon/>
              </Box>
              <Task/>
              <Task/>
              <Task/>
            </Box>
        </Container>
    );
}
export default Main;
