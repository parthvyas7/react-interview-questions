export const StarRatingCode = `
const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onChange }) => {
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
                <StarIcon sx={{ color: 'gold' }} />
              ) : (
                <StarBorderIcon sx={{ color: 'gold' }} />
              )}
            </StarButton>
          );
        })}
      </StarsContainer>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {rating > 0 ? \`Your rating: \${rating} out of \${totalStars}\` : 'No rating selected'}
      </Typography>
    </Box>
  );
};
`;