import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

//1.액션 변수명 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

//2. 액션 생성함수 정의
//마우스 클릭 이벤트가 payload 안에 들어가지 않도록
//()=>undefined 를 두번째 파라미터로 넣어줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

function* increaseSaga() {
  yield delay(1000); //1초 기다림
  yield put(increase()); //increase 액션을 디스패치합니다.
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  //takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해줍니다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
