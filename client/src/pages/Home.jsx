import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const items = [
  {
    id: 1,
    title: "React",
    desc: "UI Library",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    url: "https://react.dev",
  },
  {
    id: 2,
    title: "MUI",
    desc: "Component Library",
    img: "https://mui.com/static/logo.png",
    url: "https://mui.com",
  },
  {
    id: 3,
    title: "Node.js",
    desc: "Backend Runtime",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    url: "https://nodejs.org",
  },
];

function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to ITPE4 Full-Stack App
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        A complete React + MUI + Node.js project.
      </Typography>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": { boxShadow: 8 },
                transition: "box-shadow 0.3s",
              }}
            >
              <CardMedia
                component="img"
                height={180}
                image={item.img}
                alt={item.title}
                sx={{
                  objectFit: "contain",
                  p: 2,
                  bgcolor: "#f0f4f8",
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">
                  {item.title}
                </Typography>

                <Typography color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  href={item.url}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;