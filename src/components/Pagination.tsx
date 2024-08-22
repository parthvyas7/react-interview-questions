import { Box, Typography, ButtonGroup } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Pagination = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Pagination</Typography>
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
    </>
  );
};

export default Pagination;
