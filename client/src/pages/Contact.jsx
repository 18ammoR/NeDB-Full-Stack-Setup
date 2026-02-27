import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};

    if (!form.name.trim())
      errs.name = "Name is required";

    if (!form.email.includes("@"))
      errs.email = "Valid email required";

    if (!form.message.trim())
      errs.message = "Message is required";

    return errs;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Thank you! Your message has been sent.
      </Alert>
    );

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="name"
            label="Full Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name || ""}
          />

          <TextField
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email || ""}
          />

          <TextField
            name="message"
            label="Message"
            multiline
            rows={4}
            fullWidth
            value={form.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message || ""}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
          >
            Send Message
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Contact;