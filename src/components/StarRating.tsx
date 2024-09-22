import {
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DisplayCode from "./DisplayCode";
import DoneIcon from "@mui/icons-material/Done";
import { StarRatingCode } from "../assets";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const StarsContainer = styled("div")({
  display: "inline-flex",
  alignItems: "center",
});

const StarButton = styled("button")({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  transition: "transform 0.1s",
  "&:hover": {
    transform: "scale(1.2)",
  },
});

interface StarRatingProps {
  totalStars?: number;
  onChange?: (rating: number) => void;
}

const StarRatingSub: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onChange,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  return (
    <Box>
      <StarsContainer>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <StarButton
              key={index}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              {starValue <= (hover || rating) ? (
                <StarIcon sx={{ color: "gold", fontSize: "5rem" }} />
              ) : (
                <StarBorderIcon sx={{ color: "gold", fontSize: "5rem" }} />
              )}
            </StarButton>
          );
        })}
      </StarsContainer>
      <Typography variant="h4" sx={{ mt: 1 }}>
        {rating > 0 ? `${rating} out of ${totalStars}` : "No rating"}
      </Typography>
    </Box>
  );
};

const StarRating: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleReset = () => {};
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(StarRatingCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handleRatingChange = (newRating: number) => {
    console.log(`New rating selected: ${newRating}`);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          Star Rating
        </Typography>
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
          <DisplayCode code={StarRatingCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper
          sx={{ borderRadius: "10px", padding: "10px", textAlign: "center" }}
        >
          <StarRatingSub totalStars={5} onChange={handleRatingChange} />
        </Paper>
      )}
    </>
  );
};

export default StarRating;
