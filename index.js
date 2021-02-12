import { useRef, useState, useEffect } from "react";

const useDerivedState = (initialState, deps = initialState) => {
  const prevDeps = useRef();

  const [state, set] = useState(initialState);

  useEffect(() => set(initialState), deps);

  const returnValue = prevDeps.current === undefined || state === initialState || areHookInputsEqual(deps, prevDeps.current)
    ? state
    : evaluateState(initialState);
  prevDeps.current = deps;

  return [returnValue, set];
};

export default useDerivedState;

const areHookInputsEqual = (nextDeps, prevDeps) => {
  if (nextDeps.length !== prevDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
};

const evaluateState = s => typeof s === "function" ? s() : s;
