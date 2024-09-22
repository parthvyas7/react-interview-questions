import { Box, Typography, ButtonGroup, Paper, Card } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeIcon from "@mui/icons-material/Code";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { PaginationCode } from "../assets";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DisplayCode from "./DisplayCode";
import { Pagination as PaginationMUI } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Star } from "@mui/icons-material";

const Pagination = () => {
  interface rating {
    rate: number;
    count: number;
  }
  interface product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: rating;
  }
  const [products, setProducts] = useState([]);
  const productsPerPage = 6;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleReset = () => {
    setCurrentPage(1);
  };
  const handleShowCode = () => {
    setShowCode(!showCode);
  };
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(PaginationCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event)
    setCurrentPage(page);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" gutterBottom>Pagination</Typography>
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
          <DisplayCode code={PaginationCode} />
        </Paper>
      )}
      {!showCode && (
        <Paper elevation={0} sx={{ borderRadius: "10px", padding: "20px" }}>
          <Grid2 container spacing={2}>
            {products.map((product: product) => {
              if (
                product.id > (currentPage - 1) * productsPerPage &&
                product.id <=
                  (currentPage - 1) * productsPerPage + productsPerPage
              ) {
                return (
                  <Grid2
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Card
                      sx={{ maxWidth: 345, maxHeight: 500 }}
                      key={product.id}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="300"
                          image={product.image}
                          alt={product.title}
                          sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {product.category}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            noWrap
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={product.title}
                          >
                            {product.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                            title={product.description}
                          >
                            {product.description}
                          </Typography>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            marginTop={2}
                          >
                            <Typography
                              variant="body1"
                              color="text"
                              display="flex"
                              alignItems="center"
                            >
                              <CurrencyRupeeIcon fontSize="small" />
                              {product.price}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text"
                              display="flex"
                              alignItems="center"
                            >
                              <Star fontSize="small" />
                              {product.rating.rate} ({product.rating.count})
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid2>
                );
              }
            })}
          </Grid2>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={2}
          >
            {loading && <CircularProgress />}
            <PaginationMUI
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
            />
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Pagination;
