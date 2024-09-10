import InfiniteScroll from "./InfiniteScroll";
import Pagination from "./Pagination";
import UseFetch from "./UseFetch";
import Welcome from "./Welcome";
import UseWindowResize from "./UseWindowResize";

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
    default:
      return <Welcome />;
  }
};

export default SelectComponent;
