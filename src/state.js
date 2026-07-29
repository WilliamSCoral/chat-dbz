let state = {
  status: 'idle',
  messages: [],
  history: [],
  character: null,
  error: null,
  characterHistories: {},
};

export function getState() {
  return { ...state };
}

export function setState(partial) {
  state = { ...state, ...partial };
}
