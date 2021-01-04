import { createAction, handleActions } from "redux-actions";

//1.액션 변수명 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//2. 액션 생성함수 정의
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//아래 async함수들을 호출하면,
//1초 뒤에 increase /decrease함수를 디스패치함
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
