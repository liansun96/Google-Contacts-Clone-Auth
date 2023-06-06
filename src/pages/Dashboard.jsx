import React from "react";
import ContactTable from "../Components/ContactsTable";
import { useGetContactQuery } from "../redux/api/contactApi";
import { RevolvingDot } from "react-loader-spinner";

const Dashboard = () => {
  const { data, isLoading } = useGetContactQuery();

  return (
    <div>      
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <RevolvingDot
              height="1000"
              width="1000"
              radius="36"
              color="#9173e9"
              secondaryColor=""
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
