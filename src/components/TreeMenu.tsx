import {
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DisplayCode from "./DisplayCode";
import DoneIcon from "@mui/icons-material/Done";
import { TreeMenuCode } from "../assets";
import { styled } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TreeItem = styled("div")({
  padding: "4px 0",
});

const TreeItemContent = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const TreeItemChildren = styled("div")({
  paddingLeft: "16px",
});

interface TreeNode {
  name: string;
  type: "file" | "folder";
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
}

const TreeViewItem: React.FC<{ node: TreeNode; level: number }> = ({
  node,
  level,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const getIcon = () => {
    if (node.type === "file")
      return <InsertDriveFileIcon sx={{ mr: 1, fontSize: "2rem" }} />;
    return isOpen ? (
      <FolderOpenIcon sx={{ mr: 1, fontSize: "2rem" }} />
    ) : (
      <FolderIcon sx={{ mr: 1, fontSize: "2rem" }} />
    );
  };

  return (
    <TreeItem>
      <TreeItemContent
        onClick={handleToggle}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {hasChildren && (
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
            {isOpen ? (
              <ExpandMoreIcon fontSize="large" />
            ) : (
              <ChevronRightIcon fontSize="large" />
            )}
          </Box>
        )}
        {getIcon()}
        <Typography variant="h4">{node.name}</Typography>
      </TreeItemContent>
      {isOpen && hasChildren && (
        <TreeItemChildren>
          {node.children!.map((childNode, index) => (
            <TreeViewItem key={index} node={childNode} level={level + 1} />
          ))}
        </TreeItemChildren>
      )}
    </TreeItem>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <Box>
      {data.map((node, index) => (
        <TreeViewItem key={index} node={node} level={0} />
      ))}
    </Box>
  );
};

const TreeMenu: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleReset = () => {};
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(TreeMenuCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const treeData: TreeNode[] = [
    {
      name: "Root",
      type: "folder",
      children: [
        {
          name: "Documents",
          type: "folder",
          children: [
            { name: "Document1.txt", type: "file" },
            { name: "Document2.txt", type: "file" },
            {
              name: "Projects",
              type: "folder",
              children: [
                { name: "Project1", type: "folder", children: [] },
                { name: "Project2", type: "folder", children: [] },
              ],
            },
          ],
        },
        {
          name: "Images",
          type: "folder",
          children: [
            { name: "Image1.jpg", type: "file" },
            { name: "Image2.png", type: "file" },
          ],
        },
        { name: "README.md", type: "file" },
      ],
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          Tree Menu
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
          <DisplayCode code={TreeMenuCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper
          sx={{ borderRadius: "10px", padding: "10px", textAlign: "center" }}
        >
          <TreeView data={treeData} />
        </Paper>
      )}
    </>
  );
};

export default TreeMenu;
