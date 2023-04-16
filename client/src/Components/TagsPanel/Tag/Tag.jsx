import React from "react";

function Tag({ tag, onClick, isClickable }) {
  //todo
  return (
    <div className="flex flex-row group mr-8 w-40 items-center">
      <div
        className={
          isClickable
            ? "cursor-pointer bg-primary w-[1.84rem] h-[1.84rem] rotate-45 aspect-square pl-4 translate-x-[0.98rem] z-0 rounded-sm group-hover:bg-white"
            : "bg-primary w-[1.84rem] h-[1.84rem] rotate-45 aspect-square pl-4 translate-x-[0.98rem] z-0 rounded-sm "
        }
      ></div>
      <div
        className={
          isClickable
            ? "cursor-pointer z-10 flex h-10  pr-4 pl-4 items-center justify-center bg-primary  rounded-sm group-hover:bg-white"
            : "z-10 flex h-10  pr-4 pl-4 items-center justify-center bg-primary  rounded-sm"
        }
        onClick={() => onClick(tag)}
      >
        <div
          className={
            isClickable
              ? "w-32 text-center font-semibold pl-2 pr-2 text-white group-hover:text-primary group-hover:font-semibold "
              : "w-32 text-center font-semibold pl-2 pr-2 text-white   "
          }
        >
          {tag.name}
        </div>
      </div>
    </div>
  );
}
// function Tag({ tag, onClick }) {
//   return (
//     <div className="flex flex-row group  mr-8 w-40  items-center ">
//       <div className=" cursor-pointer bg-primary w-7 h-7 rotate-45 aspect-square pl-4 translate-x-[0.9rem] z-0 rounded-sm border-primary border-b border-l group-hover:border-white"></div>
//       <div
//         className=" cursor-pointer z-10 flex h-10  pr-4 pl-4 items-center justify-center bg-primary  rounded-sm border-primary border-t border-r border-b  group-hover:border-white"
//         onClick={() => onClick(tag)}
//       >
//         <div className=" w-32 text-center font-semibold pl-2 pr-2 text-white">
//           {tag.name}
//         </div>
//       </div>
//     </div>
//   );
// }

export default Tag;
