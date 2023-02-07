import React from "react";
import { useParams } from "react-router-dom";
import AnupamKher from "./AnupamKher";
import ArjunRampal from "./ArjunRampal";

function Celebrity() {
  const { Creatorname, Slug } = useParams();
  return (
    <>
      {Slug.toLocaleLowerCase() === "anupam-kher" && <AnupamKher />}
      {Slug.toLocaleLowerCase() === "arjun-rampal" && <ArjunRampal />}
    </>
  );
}

export default Celebrity;
