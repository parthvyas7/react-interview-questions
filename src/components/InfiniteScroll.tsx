import { ArrowDownward } from "@mui/icons-material";
import {
  Button,
  Skeleton,
  Stack,
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skipRecords, setSkipRecords] = useState(0);
  const [manualFetchDisable, setManualFetchDisable] = useState("visible");
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
        setManualFetchDisable("hidden");
        handleLoadData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, handleLoadData]);
  console.log(data);
  return (
    <>
      <Box>
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
            <Tooltip title="Reset">
              <IconButton>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
        <Stack
          spacing={2}
          padding={2}
          marginY={2}
          border="2px dashed"
          borderRadius="10px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {data.length === 0 && !loading && (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginY={1}
            >
              <InfoIcon fontSize="small" />
              <Typography paddingX={1}>
                Initially fetch records (quotes) till it fills viewport
              </Typography>
            </Box>
          )}
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
        </Stack>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{visibility:manualFetchDisable}}
          // visibility={manualFetchDisable}
        >
          <Button variant="contained" onClick={handleLoadData}>
            Manual Fetch
            <ArrowDownward />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InfiniteScroll;
