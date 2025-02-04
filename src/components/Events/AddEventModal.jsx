import { Modal, Form, Input, Select, DatePicker, Button, TimePicker, message } from "antd";
import React from "react";
import { MdAccessTime } from "react-icons/md";
import { useEventAddMutation } from "../../page/redux/api/eventApi";

export const AddEventModal = ({ modal2Open, setModal2Open }) => {
  const [form] = Form.useForm();
  const [eventAdd, { isLoading }] = useEventAddMutation();

  const handleFinish = async (values) => {
    // Prepare the data to match the API requirements
    const data = {
      eventName: values.name,
      eventType: values.type,
      location: values.location,
      messageDeliveryDriver: values.message,
      messageWarehouseVolunteer: values.volunteer,
      dayOfEvent: values.date.format("YYYY-MM-DD"),
      startOfEvent: values.timeFrom.format("h:mm A"),
      endOfEvent: values.timeTo.format("h:mm A"),
      deliveryNeeded: parseInt(values.deliveryDrivers),
      warehouseNeeded: parseInt(values.warehouseVolunteers),
    };
    console.log(data)

    try {
      const response = await eventAdd(data).unwrap();
      message.success(response.message || "Event added successfully!");
      form.resetFields();
      setModal2Open(false);
    } catch (error) {
      message.error(error.data?.message || "Failed to add event. Please try again.");
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setModal2Open(false);
  };

  return (
    <Modal
      title="Add Event"
      centered
      open={modal2Open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: "",
          type: "",
          location: "",
          date: null,
          timeFrom: null,
          timeTo: null,
          deliveryDrivers: "",
          warehouseVolunteers: "",
          message: "",
          volunteer: "",
        }}
      >
        <Form.Item
          name="name"
          label="Event Name"
          rules={[{ required: true, message: "Event Name is required" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Event Type"
          rules={[{ required: true, message: "Event Type is required" }]}
        >
          <Select placeholder="Select Event Type">
            <Select.Option value="birthday">Birth Day</Select.Option>
            <Select.Option value="wed">Wed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Location is required" }]}
        >
          <Input placeholder="Enter Location" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Default Message to Delivery Driver"
          rules={[{ required: true, message: "Message is required" }]}
        >
          <Input placeholder="Enter default message" />
        </Form.Item>

        <Form.Item
          name="volunteer"
          label="Default Message to Warehouse Volunteer"
          rules={[{ required: true, message: "Message is required" }]}
        >
          <Input placeholder="Enter default message" />
        </Form.Item>

        <div className="border rounded-md border-neutral-400 p-3 mb-3">
          <h1 className="flex items-center font-semibold border-b pb-2">
            <MdAccessTime className="text-lg mr-2" /> Date & Time
          </h1>

          <Form.Item
            name="date"
            label="On"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="timeFrom"
            label="From"
            rules={[{ required: true, message: "Start Time is required" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              placeholder="Select Time"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="timeTo"
            label="To"
            rules={[{ required: true, message: "End Time is required" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              placeholder="Select Time"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="deliveryDrivers"
          label="Delivery Drivers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter number of drivers" />
        </Form.Item>

        <Form.Item
          name="warehouseVolunteers"
          label="Warehouse Volunteers Needed"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter number of warehouse volunteers" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#234E6F] text-white rounded-full"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
