
export function Square() {
    const [value, setValue] = React.useState(null);
  
    return (
      <button onClick={() => setValue('X')}>
        {value}
      </button>
    );
  }
  