import { Container, Typography, Box, Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
const Welcome = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
          }}
        >
          <Typography variant="h4" textAlign="center">
            Practice React.js Machine Coding Round problems in React-Typescript
            (tsx)
          </Typography>
          <Typography variant="h6" textAlign="center">
            Do contribute by opening{" "}
            <Link
              underline="hover"
              component="a"
              href="https://github.com/parthvyas7/react-interview-questions/issues"
              target="_blank"
            >
              Issue/PR
            </Link>
            , if you find any missing/new problem(s) that you have faced in your
            interview.
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "row",
              fontStyle: "italic",
              alignItems: "center",
            }}
          >
            <InfoIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
            <Typography variant="body1" textAlign="center">
              Best viewed in Laptop/Desktop
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Welcome;
