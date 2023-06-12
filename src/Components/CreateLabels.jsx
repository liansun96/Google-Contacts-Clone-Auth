import React from 'react'

const CreateLabels = () => {
    return (
        <div className="flex">
          <div className="flex flex-col justify-center items-center h-[80vh] w-full md:w-[85%] gap-5">
            <div className="animate__animated animate__fadeInLeft">
              <img
                className="h-[200px]"
                src="https://ssl.gstatic.com/social/contactsui/images/emptycontacts/emptycontacts_animation_cell4.png"
                alt=""
                data-iml="221705438.80000007"
              />
            </div>
            <h1 className="text-gray-500 animate__animated animate__fadeInRight">
              This feature's not avaliable now
            </h1>
          </div>
          <div className="w-[0%] md:w-[15%] md-hidden"></div>
        </div>
      );
}

export default CreateLabels