import InfiniteScroll from "./InfiniteScroll";
import Pagination from "./Pagination";
import UseFetch from "./UseFetch";
import Welcome from "./Welcome";
import UseWindowResize from "./UseWindowResize";
import Accordion from "./Accordion";
import StarRating from "./StarRating";
import TreeMenu from "./TreeMenu";

const SelectComponent = ({ choice }: { choice: number }) => {
  switch (choice) {
    case 0:
      return <InfiniteScroll />;
    case 1:
      return <Pagination />;
    case 2:
        return <UseFetch />;
    case 3:
      return <UseWindowResize />;
    case 4:
      return <Accordion />;
    case 5:
      return <StarRating />;
    case 6:
        return <TreeMenu />;
    default:
      return <Welcome />;
  }
};

export default SelectComponent;
