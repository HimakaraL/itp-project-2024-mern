import React from "react";
import { Card, Badge } from "flowbite-react";


const ViewServices = ({ service }) => {
  function selectStat(s) {
    var Stat = "";
    if (s === "Active") {
 
      return { Stat: "Active", color: "text-green-800" };
    } else {

      return { Stat: "Unavailable", color: "text-red-800" };
    }
  }
  let bgcolors = [

    'bg-yellow-300',
    // Add more colors here as needed
  ];

  const selectCardColor = bgcolors[0];

  const { Stat, color } = selectStat(service.status);

  return (
    <div className="flex items-center justify-center pl-10 mb-8 h-72 w-72">

      <Card className={`max-w-md ${selectCardColor} shadow-md rounded-2xl p-4`}>
        <div className="flex justify-center mb-4">
          <img
        
            className="w-20 h-20 border-2 border-white rounded-full"

            src={`http://localhost:3000/icons/${service.icon}`}
            alt="Icon-svgs"
          />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {service.sname}
          </h5>
    
          <p className="mt-2 font-normal text-gray-600 dark:text-gray-400">
            {service.description}
          </p>
          
          <div className="mt-4">
            <Badge className={`text-white ${color} py-1 px-2 rounded-lg`}>{Stat}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewServices;
