import * as React from "react";

export default function useDerivedState(value) {
  const [state, setState] = React.useState(value);
  React.useEffect(() => {
    setState(value);
  }, [value]);
  return [state, setState];
}
