import {
  Button,
  Skeleton,
  Stack,
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ArrowDownward } from "@mui/icons-material";
import DisplayCode from "./DisplayCode";
import { InfiniteScrollCode } from "../assets";
import DoneIcon from "@mui/icons-material/Done";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skipRecords, setSkipRecords] = useState(0);
  const [manualFetchDisable, setManualFetchDisable] = useState("visible");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
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
  const handleReset = () => {
    setLoading(false);
    setData([]);
    setSkipRecords(0);
    setManualFetchDisable("visible");
  };
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(InfiniteScrollCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" gutterBottom>Infinite scroll</Typography>
        <ButtonGroup aria-label="Basic button group">
          <Tooltip title="Copy code">
            <IconButton onClick={handleCopyCode}>
              {copied ? <DoneIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Show code">
            <IconButton onClick={handleShowCode}>
              <CodeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>
      {showCode && (
        <Paper sx={{ borderRadius: "10px" }}>
          <DisplayCode code={InfiniteScrollCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper sx={{ borderRadius: "10px" }}>
          <Stack spacing={1} padding={2} display="flex" flexDirection="column">
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
            pb={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ visibility: manualFetchDisable }}
          >
            <Button variant="contained" onClick={handleLoadData}>
              Manual Fetch
              <ArrowDownward />
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default InfiniteScroll;
