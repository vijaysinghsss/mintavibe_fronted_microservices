import React from "react";
import { useParams } from "react-router-dom";
import AnupamKher from "./AnupamKher";
import ArjunRampal from "./ArjunRampal";

function Celebrity() {
  const { celeName } = useParams();
  return (
    <>
      {celeName === "Anupam_Kher" && <AnupamKher />}
      {celeName === "Arjun_Rampal" && <ArjunRampal />}
    </>
  );
}

export default Celebrity;
