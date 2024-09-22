import {
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DisplayCode from "./DisplayCode";
import { UseWindowResizeCode } from "../assets";
import DoneIcon from "@mui/icons-material/Done";

interface WindowSize {
  width: number;
  height: number;
}

function useWindowResize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
}

const UseWindowResize = () => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { width, height } = useWindowResize();
  const handleReset = () => {};
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(UseWindowResizeCode)
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
        <Typography variant="h4" gutterBottom>useWindowResize custom hook</Typography>
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
          <DisplayCode code={UseWindowResizeCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper
          sx={{ borderRadius: "10px", padding: "10px", textAlign: "center" }}
        >
          <h3>Window Size:</h3>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
          {width < 768 ? (
            <p>You are viewing on a mobile device</p>
          ) : (
            <p>You are viewing on a desktop</p>
          )}
        </Paper>
      )}
    </>
  );
};

export default UseWindowResize;
