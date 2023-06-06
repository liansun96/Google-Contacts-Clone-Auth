import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import './GoogleApp.css';

const GoogleApps = ({ showApp }) => {
  return (
    <div
      className={
        showApp
          ? "scale-y-1 z-50 duration-300 origin-top absolute cus-shadow-lg right-[15px] top-[60px] bg-white w-[322px] h-[400px] font-robo cus-shadow-lg p-5 rounded-lg overflow-y-scroll scroll-smooth scale-y-1"
          : "scale-y-0 z-50 duration-300 origin-top absolute cus-shadow-lg right-[15px] top-[60px] bg-white w-[322px] h-[400px] font-robo cus-shadow-lg p-5 rounded-lg overflow-y-scroll scroll-smooth scale-y-0"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to={"https://www.google.com/?authuser=0"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <div className="w-[40px] h-[40px] rounded-full bg-orange-400"></div>
            <h4>Account</h4>
          </div>
        </Link>
        <Link to={"https://www.google.com/?authuser=0"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <FcGoogle className="w-[40px] h-[40px]" />
            <h4>Search</h4>
          </div>
        </Link>
        <Link to={"https://www.google.com/maps"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Map</h4>
          </div>
        </Link>
        <Link to={"https://play.google.com/store/games?pli=1"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Play_logo-2022.png"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Play</h4>
          </div>
        </Link>
        <Link
          to={"https://news.google.com/home?hl=en-US&gl=US&ceid=US:en"}
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_News_icon.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>News</h4>
          </div>
        </Link>
        <Link to={"https://www.google.com/gmail/about/"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Gmail</h4>
          </div>
        </Link>
        <Link
          to={
            "https://www.google.com/search?q=google+translate&rlz=1C1YTUH_enSG1012SG1012&oq=&aqs=chrome.1.69i57j69i59j35i39i650j0i20i263i512j69i65j69i60l3.4407j0j9&sourceid=chrome&ie=UTF-8"
          }
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Translate</h4>
          </div>
        </Link>
        <Link
          to={"https://calendar.google.com/calendar/u/0/r?pli=1"}
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Calender</h4>
          </div>
        </Link>
        <Link to={"https://contacts.google.com/"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Google_Contacts_icon_%282022%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Contacts</h4>
          </div>
        </Link>
        <Link to={"https://meet.google.com/?pli=1"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Google_Meet_logo_%282022%29.png"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Meet</h4>
          </div>
        </Link>
        <Link
          to={"https://mail.google.com/chat/u/0/#chat/welcome"}
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Chat_icon_%282020%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Chat</h4>
          </div>
        </Link>
        <Link to={"https://www.google.com/drive/"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Drive</h4>
          </div>
        </Link>
        <Link to={"https://www.google.com/photos/about/"} target="_blank">
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/60/Google_Photos_icon_%282015-2020%29.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Photos</h4>
          </div>
        </Link>
        <Link
          to={"https://myadcenter.google.com/?ref=app-launcher"}
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/My_Ad_Center_logo.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Photos</h4>
          </div>
        </Link>
        <Link
          to={"https://www.google.com/shopping?source=og&authuser=0"}
          target="_blank"
        >
          <div className="flex flex-col w-[80px] h-[85px] hover:bg-blue-100 justify-center items-center gap-1 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Google_Shopping.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h4>Photos</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default GoogleApps;
