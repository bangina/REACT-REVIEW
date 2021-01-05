import React from "react";
import { getNextTimeline } from "../../common/mockData";
import TimelineList from "../component/TimelineList.js";
import { connect } from "react-redux";
import { actions } from "../state";

class TimelineMain extends React.Component {
  onAdd = () => {
    const { addTimeline } = this.props;
    const timeline = getNextTimeline();
    addTimeline(timeline);
  };
  onLike = (e) => {
    const { timelines } = this.props;
    const id = Number(e.target.dataset.id); //data-id 속성
    const timeline = timelines.find((item) => item.id === id); //타겟 id와 동일한 timeline
    this.props.requestLike(timeline); //this.props === "actions" (connect통해)
  };
  render() {
    const { timelines, isLoading, error } = this.props; //
    return (
      <div>
        <button onClick={this.onAdd}>타임라인 추가</button>
        <TimelineList timelines={timelines} onLike={this.onLike} />
        {!!isLoading && <p>전송 중...</p>}
        {!!error && <p>에러발생 : {error}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timelines: state.timeline.timelines,
  isLoading: state.timeline.isLoading,
  error: state.timeline.error,
});

export default connect(mapStateToProps, actions)(TimelineMain);
