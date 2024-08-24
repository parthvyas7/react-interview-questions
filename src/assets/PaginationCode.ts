export const PaginationCode = `
const [products, setProducts] = useState([]);
const productsPerPage = 3;
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
const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  <Paper >
          <Grid2>
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
`;