interface IState {
  readonly subscriptions?: Array<string>;
}

interface IAction {
  readonly type: string;
  readonly channel?: string;
}

const types = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  UNSUBSCRIBE_ALL: 'UNSUBSCRIBE_ALL',
};

const initialState: IState = {
  subscriptions: [],
};

const addSubscription = (subscriptions: Array<string> | undefined, channel: string | undefined) => {
  return [...(subscriptions || [])].concat(channel || []).filter((subscription, i, self) => {
    return self.indexOf(subscription) === i;
  });
};

const removeSubscription = (subscriptions: Array<string> | undefined, channel: string | undefined) => {
  return [...(subscriptions || [])].filter(subscription => {
    return subscription !== channel;
  });
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  const actions = {
    [types.SUBSCRIBE]: () => {
      return {
        ...state,
        subscriptions: addSubscription(state.subscriptions, action.channel),
      };
    },
    [types.UNSUBSCRIBE]: () => {
      return {
        ...state,
        subscriptions: removeSubscription(state.subscriptions, action.channel),
      };
    },
    [types.UNSUBSCRIBE_ALL]: () => {
      return {
        ...state,
        subscriptions: [],
      };
    },
  };

  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

// Required Exports
export { IState, IAction, types, initialState, reducer };
