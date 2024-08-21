import { ArrowDownward } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skipRecords, setSkipRecords] = useState(0);
  const handleLoadData = useCallback(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/quotes?limit=3&skip=${skipRecords}`)
      .then((res) => res.json())
      .then((res) => {
        setData((data) => data.concat(res.quotes));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setSkipRecords((skipRecords) => skipRecords + 3);
        setLoading(false);
      });
  }, [skipRecords]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        handleLoadData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, handleLoadData]);
  return (
    <>
      <Container>
        <Typography variant="h2" gutterBottom>
          Commonly Asked React Interview Questions
        </Typography>
        <Divider />
        <Stack spacing={2}>
          <Typography variant="h3">Infinite scroll</Typography>
          {data.map((it) => (
            <Typography key={it.id} variant="h4">
              {it.quote}
            </Typography>
          ))}
          {loading && (
            <>
              <Skeleton variant="rectangular" height={30} />
              <Skeleton variant="rectangular" height={30} />
              <Skeleton variant="rectangular" height={30} />
            </>
          )}
          <Button variant="contained" onClick={handleLoadData}>
            More Quotes
            <ArrowDownward />
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
