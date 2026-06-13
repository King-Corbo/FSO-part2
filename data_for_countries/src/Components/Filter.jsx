const Filter = ({ newFilter, handleNewFilter }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      Find countries:{" "}
      <input
        name="filter_input"
        value={newFilter}
        onChange={handleNewFilter}
      />
    </div>
  );
};

export default Filter;
