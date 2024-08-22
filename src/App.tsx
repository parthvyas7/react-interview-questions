import {
  List,
  ListItem,
  ListItemButton,
  Divider,
  Typography,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState } from "react";
import { SelectComponent } from "./components";

function App() {
  const [choice, setChoice] = useState<number>(-1);
  const handleSelect = (selectedChoice: number) => {
    setChoice(selectedChoice);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" textAlign="center">
            Commonly Asked React Interview Questions
          </Typography>
          <Divider />
        </Grid>
        <Grid xs={2}>
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
            </List>
          </nav>
        </Grid>
        <Grid xs={10}>
          <SelectComponent choice={choice} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
