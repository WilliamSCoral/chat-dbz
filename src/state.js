let state = {
  status: 'idle',
  messages: [],
  character: null,
  error: null,
};

export function getState() {
  return { ...state };
}

export function setState(partial) {
  state = { ...state, ...partial };
}
