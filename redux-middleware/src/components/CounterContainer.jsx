import React from "react";
import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "./Counter";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

//redux와 연결
export default connect(
  (state) => ({
    number: state.counter,
  }),
  {
    increaseAsync, // increase = createAction(INCREASE);(액션생성함수 불러오기)
    decreaseAsync,
  }
)(CounterContainer);
