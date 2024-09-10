import {
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
  Skeleton,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DisplayCode from "./DisplayCode";
import { UseFetchCode } from "../assets";
import DoneIcon from "@mui/icons-material/Done";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

const UseFetch = () => {
  const { data, loading, error, refetch } = useFetch(
    "https://foodish-api.com/api/"
  );
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleReset = () => {};
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(UseFetchCode)
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
        <Typography variant="h4">useFetch custom hook</Typography>
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
          <DisplayCode code={UseFetchCode} />
        </Paper>
      )}
      {!showCode && (
        <Card sx={{ maxWidth: 345, margin: "auto" }} onClick={refetch}>
          <CardActionArea>
            {loading ? (
              <Skeleton height={345} width={345} variant="rectangular" />
            ) : (
              // @ts-ignore
              <CardMedia
                component="img"
                objectFit="cover"
                height={345}
                width={345}
                // @ts-ignore
                image={data.image}
                loading="lazy"
              />
            )}
            {error && <Typography>{error.message}</Typography>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Click me for another dish?
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default UseFetch;
