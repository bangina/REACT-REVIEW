import React from "react";

function TimelineList({ timelines, onLike }) {
  return (
    <div>
      <ul>
        {timelines.map(({ id, desc, likes }) => (
          <li key={id}>
            {desc}
            <button data-id={id} onClick={onLike}>{`좋아요(${likes})`}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimelineList;
