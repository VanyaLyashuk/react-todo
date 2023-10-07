import FilterBtn from "./FilterBtn";

const Filters = () => {
  return (
    <div className="flex gap-[5px] sm:gap-2">
      <FilterBtn name="All" />
      <FilterBtn name="Todo" />
      <FilterBtn name="Completed" />
    </div>
  );
};

export default Filters;
