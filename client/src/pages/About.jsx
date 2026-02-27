import { Typography, Box, Paper } from "@mui/material";

function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          This is a full-stack JavaScript application built with React, Material UI (MUI),
          and Node.js/Express backend.
        </Typography>

        <Typography variant="body1" paragraph>
          It demonstrates the complete ITPE4 curriculum including:
        </Typography>

        <Typography component="ul" variant="body1">
          <li>React components, props, and state management</li>
          <li>Material UI components and theming</li>
          <li>React Router for navigation</li>
          <li>Node.js & Express REST API</li>
          <li>Full-stack integration with CRUD operations</li>
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;