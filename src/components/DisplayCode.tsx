import { Box } from "@mui/material";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";

const DisplayCode = ({ code }: { code: string }) => {
  hljs.registerLanguage("typescript", typescript);
  const highlightedCode = hljs.highlight(code, {
    language: "typescript",
  }).value;

  return (
    <Box>
      <div
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        style={{
          backgroundColor: "#282c34",
          padding: "0 20px",
          color: "#abb2bf",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          overflow: "auto",
          maxHeight: "75vh",
          fontSize: "18px",
          borderRadius: "10px",
          scrollbarWidth: "none",
        }}
      />
    </Box>
  );
};

export default DisplayCode;
