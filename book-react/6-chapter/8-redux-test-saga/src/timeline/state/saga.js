import { all, call, put, take, fork } from "redux-saga/effects";
import { actions, types } from "./index"; //action & type 떄려넣은 객체들
import { callApiLike } from "../../common/api";

export function* fetchData(action) {
  while (true) {
    const { timeline } = yield take(types.REQUEST_LIKE); //Like처리 콜
    yield put(actions.setLoading(true)); //로딩
    yield put(actions.addLike(timeline.id, 1));
    yield put(actions.setError("")); //에러정보 초기화
    try {
      yield call(callApiLike);
    } catch (e) {
      yield put(actions.setError(e));
      yield put(actions.addLike(-1)); //좋아요 취소
    }
    yield put(actions.setLoading(false));
  }
}

export default function* watcher() {
  yield all([fork(fetchData)]);
}
