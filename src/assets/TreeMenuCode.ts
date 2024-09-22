export const TreeMenuCode = `
const TreeViewItem: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const getIcon = () => {
    if (node.type === 'file') return <InsertDriveFileIcon sx={{ mr: 1 }} />;
    return isOpen ? <FolderOpenIcon sx={{ mr: 1 }} /> : <FolderIcon sx={{ mr: 1 }} />;
  };

  return (
    <TreeItem>
      <TreeItemContent onClick={handleToggle} style={{ paddingLeft: \`\${ level * 16}px\` }}>
        {hasChildren && (
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            {isOpen ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </Box>
        )}
        {getIcon()}
        <Typography variant="body2">{node.name}</Typography>
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
`;