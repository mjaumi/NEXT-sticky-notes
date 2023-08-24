import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store/store';

// creating typed react-redux hooks here
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;