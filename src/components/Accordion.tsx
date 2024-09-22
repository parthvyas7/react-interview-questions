import {
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DisplayCode from "./DisplayCode";
import DoneIcon from "@mui/icons-material/Done";
import { AccordionCode } from "../assets";
import { styled } from "@mui/system";

const AccordionContainer = styled("div")(() => ({
  width: "100%",
  maxWidth: 600,
  margin: "auto",
}));

const AccordionItem = styled("div")(() => ({
  borderBottom: "1px solid #ccc",
}));

const AccordionHeader = styled("button")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(2),
  background: "none",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#eaeaea",
  },
}));

const AccordionContent = styled("div")<{ isOpen: boolean }>(
  ({ theme, isOpen }) => ({
    padding: isOpen ? theme.spacing(2) : 0,
    maxHeight: isOpen ? "1000px" : "0",
    overflow: "hidden",
    transition: "all 0.1s ease-in-out",
  })
);

// Types
interface AccordionItemType {
  title: string;
  content: string;
}

interface CustomAccordionProps {
  items: AccordionItemType[];
}

// Component
const CustomAccordion: React.FC<CustomAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => handleToggle(index)}>
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography>{openIndex === index ? "▲" : "▼"}</Typography>
          </AccordionHeader>
          <AccordionContent isOpen={openIndex === index}>
            <Typography>{item.content}</Typography>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

const Accordion: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleReset = () => {};

  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(AccordionCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const accordionItems: AccordionItemType[] = [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" },
    { title: "Section 3", content: "Content for section 3" },
  ];

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" gutterBottom>Accordion</Typography>
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
          <DisplayCode code={AccordionCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper
          sx={{ borderRadius: "10px", padding: "10px", textAlign: "center" }}
        >
          <CustomAccordion items={accordionItems} />
        </Paper>
      )}
    </>
  );
};

export default Accordion;
