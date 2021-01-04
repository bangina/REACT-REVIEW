import React, { useEffect } from "react";
import Sample from "../components/Sample";
import { connect } from "react-redux";

//리덕스에서 액션함수 가져온다
import { getPost, getUsers } from "../modules/sample";

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  useEffect(() => {
    //useEffect에 바로 async 붙일 수 없으므로
    //임시로 내부에 함수 선언해서 async붙여서 호출해서 사용함
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getPost, getUsers]);
  //get 함수들 : 요청해서 결과까지 payload까지 가져오는 async await 함수
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

//리덕스와 connect
export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
