import { Container, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <>
      <Container>
        <Typography
          variant="h4"
          textAlign="center"
        >
          Practice/Revise commonly asked React Machine Coding Round problems
        </Typography>
        <Typography variant="h6" textAlign="center">Do contribute, if you find any missing problems that you have faced in your interview.</Typography>
      </Container>
    </>
  );
};

export default Welcome;
