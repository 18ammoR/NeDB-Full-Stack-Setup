import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" component={RouterLink} to="/" edge="start">
          <HomeIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
          Yas Gurl
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={RouterLink} to="/tasks">
            Tasks
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;