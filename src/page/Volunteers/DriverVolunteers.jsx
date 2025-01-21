import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Link } from "react-router-dom";
import { Dropdown, Menu, message, Modal } from "antd";
import { useGetDriverQuery } from "../redux/api/volunteerApi";
import { AddAllvolunteerModal } from "./AddAllvolunteerModal";
import { EditAllVolunteerGroup } from "./EditAllVolunteerGroup";
import { AddDriver } from "./AddDriver";
import { EditDriver } from "./EditDriver";
import { useDeleteDriverMutation } from "../redux/api/clientApi";

const DriverVolunteers = () => {
  const { data: allVolunteerData, isLoading, error } = useGetDriverQuery();
  const [modal2Open, setModal2Open] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, client: null });
  const [deleteDriver] = useDeleteDriverMutation()
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = allVolunteerData
    ? Math.ceil(allVolunteerData.data.length / itemsPerPage)
    : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Error and Loading States
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch data. Please try again.</div>;
  }

  
  // Slice Data for Pagination
  const paginatedVolunteers =
    allVolunteerData?.data.slice(startIndex, endIndex) || [];

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (volunteer) => {
    console.log("Editing Volunteer:", volunteer); // Log the volunteer details
    setEditModal({
      isOpen: true,
      client: volunteer, // Pass the volunteer object to the edit modal
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this volunteer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await deleteDriver(id).unwrap();
          message.success(response.message );
        } catch (error) {
          console.error("Error deleting volunteer:", error);
          message.error(error.data?.message );
        }
      },
    });
  };

  return (
    <div>
    <div className="mt-2 mb-5 lg:mx-5 mx-2 lg:flex justify-between">
      <div className="flex items-center border-b py-3 border-gray-300 px-1 w-full mr-5">
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
          placeholder="Search Volunteers"
          className="ml-2 flex-1 outline-none text-sm bg-white text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <div>
          <button
            onClick={() => setModal2Open(true)}
            className="w-[150px] bg-[#234E6F] rounded-full py-2 text-white"
          >
            +Add Volunteer
          </button>
        </div>
      </div>
    </div>

    <div className="lg:mx-5 mx-2 overflow-x-auto">
      <table className="lg:w-full w-[1000px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Phone #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Vip</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Volunteer Meeting
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedVolunteers.map((volunteer, index) => (
            <tr
              key={volunteer._id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-3 text-sm">
                <Link to={`/drivers/details/${volunteer._id}`}>
                  {volunteer.firstName} {volunteer.lastName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm">{volunteer.phoneNo}</td>
              <td className="px-4 py-3 text-sm">{volunteer.email}</td>
              <td className="px-4 py-3 text-sm">
                {volunteer.volunteerType ? "Yes" : "No"}
              </td>
              <td className="px-4 py-3 text-sm">
                {volunteer.volunteerType
                  ? "Driver Volunteer"
                  : "Warehouse Volunteer"}
              </td>
              <td className="px-4 py-3 text-sm">
                {volunteer.meetings.length > 0 ? (
                  <Dropdown
                    overlay={
                      <Menu
                        items={volunteer.meetings.map((meeting) => ({
                          key: meeting._id,
                          label: meeting.clientGroupName,
                        }))}
                      />
                    }
                    trigger={["click"]}
                  >
                    <div className="cursor-pointer bg-[#EDEDED] px-3 py-1 rounded-full flex items-center justify-between">
                      {volunteer.meetings.length} Meeting(s) <IoIosArrowDown />
                    </div>
                  </Dropdown>
                ) : (
                  "No Meetings"
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          key: "1",
                          label: "Edit",
                          onClick: () => handleEdit(volunteer), // Pass volunteer to handleEdit
                        },
                        {
                          key: "2",
                          label: "Delete",
                          onClick: () => handleDelete(volunteer._id),
                        },
                      ]}
                    />
                  }
                  trigger={["click"]}
                >
                  <BiDotsVerticalRounded className="cursor-pointer" />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-between items-center mt-4 px-4">
      <span className="text-sm text-gray-700">
        Showing {startIndex + 1} to{" "}
        {Math.min(endIndex, allVolunteerData?.data.length || 0)} of{" "}
        {allVolunteerData?.data.length || 0} items
      </span>
      <div className="flex gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>

    <AddDriver
      setModal2Open={setModal2Open}
      modal2Open={modal2Open}
    />
    <EditDriver
      isModalOpen={editModal.isOpen}
      setModal2Open1={setEditModal}
      client={editModal.client}
    />
  </div>
  );
};

export default DriverVolunteers;
