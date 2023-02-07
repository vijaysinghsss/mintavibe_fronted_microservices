import React from "react";
import { useParams } from "react-router-dom";
import AnupamKher from "./AnupamKher";
import ArjunRampal from "./ArjunRampal";

function Celebrity() {
  const { Creatorname,Slug } = useParams();
  return (
    <>
      {Slug === "Anupam-kher" && <AnupamKher />}
      {Slug === "Arjun-Rampal" && <ArjunRampal />}
    </>
  );
}

export default Celebrity;
