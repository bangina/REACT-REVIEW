import createReducer from "../../common/createReducer";
import createItemsLogic from "../../common/createItemsLogic";
import mergeReducers from "../../common/mergeReducers";

const { add, remove, edit, reducer: timelinesReducer } = createItemsLogic(
  "timelines"
);

//1. 액션 타입 정의(type 객체 하나안에 때려 넣기)===> Saga에서 사용할 목적
export const types = {
  INCREASE_NEXT_PAGE: "timeline/INCREASE_NEXT_PAGE",
  REQUEST_LIKE: "timeline/REQUEST_LIKE", //좋아요 API call
  ADD_LIKE: "timeline/ADD_LIKE", //좋아요 프론트 표시
  SET_LOADING: "timeline/SET_LOADING", //로딩 표시
  SET_ERROR: "timeline/SET_ERROR",
};

//2. 액션 생성자 함수 정의 (마찬가지로 actions 객체 안에 모으기)
export const actions = {
  addTimeline: add,
  removeTimeline: remove,
  editTimeline: edit,
  increaseNextPage: () => ({ type: types.INCREASE_NEXT_PAGE }), //타입 뱉어내는 함수
  requestLike: (timeline) => ({ type: types.REQUEST_LIKE, timeline }), //어느 timeline인지 인자로 전달
  addLike: (timelineId, value) => ({ type: types.ADD_LIKE, timelineId, value }),
  setLoading: (isLoading) => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setError: (error) => ({
    type: types.SET_ERROR,
    error,
  }),
};

//3. 초기 상태 정의(nextPage, isLoading)
const INITIAL_STATE = { nextPage: 0, isLoading: false, error: "" };

//4. reducer 정의(실제 어떤 액션 취할지 로직)
const reducer = createReducer(INITIAL_STATE, {
  //다음 페이지로( +1)
  [types.INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
  //스토어의 타임라인s 중에서 액션 적용할 타임라인(id가 같은)을 find
  //찾은 타임라인의 like를 +1 증가
  [types.ADD_LIKE]: (state, action) => {
    const timeline = state.timelines.find(
      (item) => item.id === action.timelineId
    );
    if (timeline) {
      timeline.likes += action.value;
    }
  },
  //로딩상태 인자값으로 변경
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_ERROR]: (state, action) => (state.error = action.error),
});
const reducers = [reducer, timelinesReducer];
export default mergeReducers(reducers);
