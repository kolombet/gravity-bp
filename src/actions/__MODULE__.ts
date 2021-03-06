import { types, names } from 'reducers';
import { Store, Dispatch, IStates, IActions } from 'reducers';
import { IData } from 'reducers/__MODULE__';

export interface IActions {
  readonly action: (data: any) => IActions.__MODULE__;
}

export const action = (dispatch: Dispatch<IActions.__MODULE__>, store: Store<IStates.__MODULE__>): IActions => ({
  action: (data: IData[]): IActions.__MODULE__ => {
    return dispatch({
      type: types.__MODULE__.ACTION,
      name: names.__MODULE__,
      data,
    });
  },
});
