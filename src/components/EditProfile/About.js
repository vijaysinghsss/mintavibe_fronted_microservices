import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { API } from '../../apiwrapper';

function About() {
  const { Bio = '' } = useSelector(state => state.User?.data);

  return (
    <div
      className="resp-tab-content hor_1 resp-tab-content-active"
      aria-labelledby="hor_1_tab_item-0"
      style={{ display: "block" }}
    >
      <h2>About</h2>
      <p>
        {Bio}
      </p>
    </div>
  );
}

export default About