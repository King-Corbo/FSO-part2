import Notifications from "./Notifications";

const FilterMessage = ({ newFilter, countriesToShow, countriesFiltered }) => {
  if (!newFilter) {
    return (
      <Notifications
        message={{
          message:
            "Please use the filter above to search for the desired country.",
          positive: false,
        }}
      />
    );
  } else if (countriesToShow.length === 0) {
    if (countriesFiltered.length === 0) {
      return (
        <Notifications
          message={{
            message: "There is no country that satisfies the filter criteria.",
            positive: false,
          }}
        />
      );
    }
    return (
      <Notifications
        message={{
          message: "Too many matches, please refine the filter criteria.",
          positive: false,
        }}
      />
    );
  } else {
    return <Notifications message={null} />;
  }
};

export default FilterMessage;
