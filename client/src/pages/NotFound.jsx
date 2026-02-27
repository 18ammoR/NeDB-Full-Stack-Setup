import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>

      <Typography variant="h5" color="text.secondary" gutterBottom>
        Page Not Found
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/"
        sx={{ mt: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
}

export default NotFound;