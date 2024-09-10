export const InfiniteScrollCode = `
const InfiniteScroll = ({ loadMore, hasMore, loader, endMessage, children }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching || !hasMore) return;
    setIsFetching(true);
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    loadMore().then(() => {
      setIsFetching(false);
    });
  }, [isFetching, loadMore]);

  return (
    <>
      {children}
      {isFetching && loader}
      {!hasMore && endMessage}
    </>
  );
};

export default InfiniteScroll;
`;