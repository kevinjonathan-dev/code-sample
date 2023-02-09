import { useContext } from 'react';
import { StoreContext } from 'contexts/store';
import ACTIONS from 'constants/actions';

function useStore(): {
  store: StoreType;
  dispatch: React.Dispatch<ActionType>;
} {
  const { store, dispatch } = useContext(StoreContext);
  return { store, dispatch, setUser, setCompany };
}

export default useStore;
