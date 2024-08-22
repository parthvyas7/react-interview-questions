import { ArrowDownward } from "@mui/icons-material";
import {
  Button,
  Skeleton,
  Stack,
  Typography,
  Box,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Infinite scroll</Typography>
        <ButtonGroup aria-label="Basic button group">
          <Tooltip title="Copy code">
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show code">
            <IconButton>
              <CodeIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>
      <Stack spacing={2} paddingY={2}>
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
