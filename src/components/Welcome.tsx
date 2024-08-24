import { Container, Typography, Box, Link } from "@mui/material";

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
            Practice React.js Machine Coding Round problems in React-Typescript (tsx)
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
        </Container>
      </Box>
    </>
  );
};

export default Welcome;
