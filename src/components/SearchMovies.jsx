export const SearchMovies = ({ value, onChange, onSubmit }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        // onSubmit={(evt) => onSubmit(evt.target.value)}
      />
    </div>
  );
};
