export const SearchBar = ({ onSubmit }) => {
  return (
    <div>
      <input
        type="text"
        // value={value}
        // onChange={(evt) => onChange(evt.target.value)}
        onSubmit={onSubmit}
      />
    </div>
  );
};
