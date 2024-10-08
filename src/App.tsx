import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState } from "react";
import { SelectComponent } from "./components";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function App() {
  const [choice, setChoice] = useState<number>(-1);
  const handleSelect = (selectedChoice: number = -1) => {
    setChoice(selectedChoice);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          md={12}
          display="flex"
          justifyContent="space-between"
          paddingX={2}
        >
          <Link
            component="button"
            onClick={() => handleSelect()}
            color="inherit"
            underline="hover"
          >
            <Typography variant="h4" textAlign="center">
              Commonly Asked React.js Interview Questions
            </Typography>
          </Link>
          <Tooltip title="Star this repo">
            <IconButton
              size="large"
              component="a"
              href="https://github.com/parthvyas7/react-interview-questions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          md={2}
          sx={{ height: "85vh", position: "sticky", overflowY: "auto" }}
        >
          <nav aria-label="main">
            <List>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(0)}>
                  <ListItemText primary="Infinite Scroll" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(1)}>
                  <ListItemText primary="Pagination" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(2)}>
                  <ListItemText primary="useFetch hook"/>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(3)}>
                  <ListItemText
                    primary="useWindowResize hook"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(4)}>
                  <ListItemText
                    primary="Accordion"
                    secondary="New"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(5)}>
                  <ListItemText
                    primary="Star Rating"
                    secondary="New"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect(6)}>
                  <ListItemText
                    primary="Tree Menu"
                    secondary="New"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleSelect()}>
                  <ListItemText primary="New problems coming soon..." />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Grid>
        <Grid md={10}>
          <SelectComponent choice={choice} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
