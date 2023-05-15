import React from "react";
import {
  HiCake,
  HiHome,
  HiPresentationChartBar,
  HiTag,
  HiUsers,
} from "react-icons/hi";

function SectionPanel({ section, onChange }) {
  return (
    <div className="ml-4 mr-4 flex flex-row items-center justify-center">
      <div className="ml-8 mr-8 flex h-fit w-[16rem] flex-col rounded-md border-4 border-black">
        <div
          className={
            section === "/cakemanager"
              ? `flex w-full flex-row items-center justify-start bg-pink-500 px-6 py-4 text-center font-semibold text-white hover:bg-pink-500 hover:text-white`
              : `flex w-full cursor-pointer flex-row items-center justify-start bg-primary px-6 py-4 text-center font-semibold text-white hover:bg-primaryHi`
          }
          id="cakemanager"
          onClick={(e) => onChange(e.currentTarget.getAttribute("id"))}
        >
          <HiCake className="mr-4 h-6 w-6 text-white" />
          <div>Administrar Tortas</div>
        </div>
        <div
          className={
            section === "/tagsmanager"
              ? `flex w-full flex-row items-center justify-start bg-pink-500 px-6 py-4 text-center font-semibold text-white hover:bg-pink-500 hover:text-white`
              : `flex w-full cursor-pointer flex-row items-center justify-start bg-primary px-6 py-4 text-center font-semibold text-white hover:bg-primaryHi`
          }
          id="tagsmanager"
          onClick={(e) => onChange(e.currentTarget.getAttribute("id"))}
        >
          <HiTag className="mr-4 h-6 w-6 text-white" />
          <div>Administrar Tags</div>
        </div>
        <div
          className={
            section === "/carrouselmanager"
              ? `flex w-full flex-row items-center justify-start bg-pink-500 px-6 py-4 text-center font-semibold text-white hover:bg-pink-500 hover:text-white`
              : `flex w-full cursor-pointer flex-row items-center justify-start bg-primary px-6 py-4 text-center font-semibold text-white hover:bg-primaryHi`
          }
          id="carrouselmanager"
          onClick={(e) => onChange(e.currentTarget.getAttribute("id"))}
        >
          <HiPresentationChartBar className="mr-4 h-6 w-6 text-white" />
          <div>Administrar Carrusel</div>
        </div>
        <div
          className={
            section === "/usersmanager"
              ? `flex w-full flex-row items-center justify-start bg-pink-500 px-6 py-4 text-center font-semibold text-white hover:bg-pink-500 hover:text-white`
              : `flex w-full cursor-pointer flex-row items-center justify-start bg-primary px-6 py-4 text-center font-semibold text-white hover:bg-primaryHi`
          }
          id="usersmanager"
          onClick={(e) => onChange(e.currentTarget.getAttribute("id"))}
        >
          <HiUsers className="mr-4 h-6 w-6 text-white" />
          <div>Administrar Usuarios</div>
        </div>
        <div
          className={
            section === "/home"
              ? `flex w-full flex-row items-center justify-start bg-pink-500 px-6 py-4 text-center font-semibold text-white hover:bg-pink-500 hover:text-white`
              : `flex w-full cursor-pointer flex-row items-center justify-start bg-primary px-6 py-4 text-center font-semibold text-white hover:bg-primaryHi`
          }
          id="home"
          onClick={(e) => onChange(e.currentTarget.getAttribute("id"))}
        >
          <HiHome className="mr-4 h-6 w-6 text-white" />
          <div className="h-full w-full">Regresar al Home</div>
        </div>
      </div>
    </div>
  );
}

export default SectionPanel;
