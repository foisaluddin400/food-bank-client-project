import { Modal, Select } from "antd";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AddModalClientDeliveriGroup } from "./AddModalClientDeliveriGroup";
import { EditClientDeliveryGroup } from "./EditClientDeliveryGroup";

const eventData = [
  {
    eventName: "September Holiday Drive 9/2",
    eventType: "10",
  },
  {
    eventName: "Mitzvah Sunday 10/14",
    eventType: "44",
  },
  {
    eventName: "Mitzvah Sunday 10/28",
    eventType: "15",
  },
];

const ClientsDelivery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  return (
    <div>
      <div className="mt-2 mb-5 lg:flex justify-between">
        {/* Search Box */}
        <div className="flex items-center py-3 border-b border-gray-300 px-1 w-full mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11 2a9 9 0 106.32 15.49l4.58 4.58a1 1 0 001.4-1.42l-4.58-4.58A9 9 0 0011 2zm0 2a7 7 0 110 14 7 7 0 010-14z" />
          </svg>
          <input
            type="text"
            placeholder="Search Clients"
            className="ml-2 flex-1 outline-none bg-white text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between mt-3 gap-3 ">
          {/* Tabs for List and Calendar View */}

          {/* Filters */}

          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all client"
              options={[
                { value: "all client", label: "All Client" },
                {
                  value: "Holocaust Survivors",
                  label: "Holocaust Survivors",
                },
                {
                  value: "Non- Holocaust Survivors",
                  label: "Non- Holocaust Survivors",
                },
              ]}
            />
          </div>
          <div>
            <Select
              className="w-full h-[42px]"
              defaultValue="all events"
              options={[
                { value: "all events", label: "Short By" },
                { value: "holiday drive", label: "Name" },
                { value: "mitzvah sunday", label: "Date" },
              ]}
            />
          </div>

          <div className="">
            <button
              onClick={() => setModalOpen(true)}
              className="w-[160px] bg-[#234E6F] rounded-full py-2 text-white"
            >
              + Create Groupe
            </button>
          </div>
        </div>
      </div>
      <table className="min-w-full border-collapse  border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium">
              Client Delivery Group
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              # of Clients
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-3 text-sm">
                <Link to={"/clients/ClientDeliveryDetailsPage"}>
                  {event.eventName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{event.eventType}</td>
              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <details className="dropdown">
                  <summary className="btn m-1 bg-[#00000000] -my-3 px-0 shadow-none hover:bg-[#ffffff00] border-none">
                    <BiDotsVerticalRounded />
                  </summary>
                  <ul className="menu dropdown-content bg-white text-black rounded z-30 right-0 w-44 p-2 shadow">
                    <li>
                      <a onClick={() => setModalOpen1(true)}>Edit</a>
                    </li>
                    <li>
                      <a>Delete</a>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddModalClientDeliveriGroup
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      ></AddModalClientDeliveriGroup>
      <EditClientDeliveryGroup
        setModalOpen1={setModalOpen1}
        modalOpen1={modalOpen1}
      ></EditClientDeliveryGroup>
    </div>
  );
};

export default ClientsDelivery;
