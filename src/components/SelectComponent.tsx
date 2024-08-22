import InfiniteScroll from "./InfiniteScroll";
import Pagination from "./Pagination";
import Welcome from "./Welcome";

const SelectComponent = ({ choice }) => {
  switch (choice) {
    case 0:
      return <InfiniteScroll />;
    case 1:
      return <Pagination />;
    default:
      return <Welcome />;
  }
};

export default SelectComponent;
