import { ArrowDownward } from "@mui/icons-material";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";

const InfiniteScroll = () => {
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
      <Stack spacing={2}>
        <Typography variant="h4">Infinite scroll</Typography>
        {data.map((it: { id: string; quote: string }) => (
          <Typography key={it.id} variant="h5">
            {it.quote}
          </Typography>
        ))}
        {loading && (
          <>
            <Skeleton variant="rectangular" height={20} />
            <Skeleton variant="rectangular" height={20} />
            <Skeleton variant="rectangular" height={20} />
          </>
        )}
        <Button variant="contained" onClick={handleLoadData}>
          Manual Fetch
          <ArrowDownward />
        </Button>
      </Stack>
    </>
  );
};

export default InfiniteScroll;
