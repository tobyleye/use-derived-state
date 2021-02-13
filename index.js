import { useRef, useState } from "react";

const useDerivedState = (initialState, deps = initialState) => {
  const prevDeps = useRef();

  const [state, set] = useState(initialState);

  const setValue = useCallback(s => {
    // Reset deps to allow returning local state
    prevDeps.current = undefined;
    set(s);
  }, []);

  const shouldKeepState = prevDeps.current === undefined || state === initialState || areHookInputsEqual(deps, prevDeps.current);

  const returnValue = shouldKeepState ? state : evaluateState(initialState);

  // Update deps if local state is returned
  if (shouldKeepState) {
    prevDeps.current = deps;
  }

  return [returnValue, setValue];
};

export default useDerivedState;

// Compare if hook inputs are equal, taken from and modified: 
// https://github.com/facebook/react/blob/1a7472624661270008011fd77f097d71e6249de9/packages/react-reconciler/src/ReactFiberHooks.new.js#L304
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
