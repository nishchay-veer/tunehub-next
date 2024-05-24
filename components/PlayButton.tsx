"use client";

import { FaPlay } from "react-icons/fa";
// import { FaPause } from "react-icons/fa";

function PlayButton() {
  return (
    <button className="
    transition
    opacity-0
    rounded-full
    items-center
    flex
    bg-pink-700
    p-4
    drop-shadow-md
    translate
    translate-y-1/4
    group-hover:translate-y-0
    hover:scale-110
    group-hover:opacity-100
    ">

        <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton