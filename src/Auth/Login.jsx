import { Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

// import Swal from "sweetalert2";
import Logo from "../assets/header/logo.png";
const Login = () => {
  // const axiosUrl = UseAxios();
  // const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);

    //   try {
    //     const response = await axiosUrl.post("/dashboard/login", values);
    //     if (response.status === 200) {
    //       localStorage.setItem("token", response.data.token);

    //       Swal.fire({
    //         title: "Logi Successful!",
    //         text: "Welcome back!",
    //         icon: "success",
    //         confirmButtonText: "OK"
    //       });

    //       navigate("/");
    //     }
    //   } catch (error) {
    //     console.error("Login failed:", error.response?.data?.message || error.message);

    //     Swal.fire({
    //       title: "LogiFailed",
    //       text: error.response?.data?.message || "Login failed. Please try again.",
    //       icon: "error",
    //       confirmButtonText: "Try Again"
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const onFinishFailed = (errorInfo) => {
    //   console.log("Failed:", errorInfo);

    //   Swal.fire({
    //     title: "Form Validation Failed",
    //     text: "Please fill all required fields correctly.",
    //     icon: "warning",
    //     confirmButtonText: "OK"
    //   });
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);

  //   Swal.fire({
  //     title: "Form Validation Failed",
  //     text: "Please fill all required fields correctly.",
  //     icon: "warning",
  //     confirmButtonText: "OK",
  //   });
  // };

  return (
    <div className="min-h-screen flex items-center  md:pt-0 px-4 justify-center ">
      <div className="  w-full max-w-[1500px] m-auto">
        <div className=" ">
          <div className="md:flex md:justify-center">
            <div className="bg-white  md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
              <div className="flex justify-center mb-4">
                <img src={Logo} alt="Logo" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Sign in to your account
              </h2>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
               
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-700">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    to={"/forgetpassword"}
                    className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                  >
                    Forget password?
                  </Link>
                </div>

                <Form.Item>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#234E6F] text-white rounded focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
