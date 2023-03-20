import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import InputBox from "../molecules/InputBox";
import InputSelector from "../molecules/InputSelector";
import Card from "../atoms/Card";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../atoms/Loader";

function UpdateOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  let [orderId, setOrderId] = useState(location.search.slice(1));
  let [resp, setresp] = useState([]);
  let [showLoader, setShowLoader] = useState(true)
  let [initialValues, setInitialValues] = useState(
    {
      _Id: "", 
      paymentId: "", 
      status: "select...", 
      orderDate: "", 
      deliveryDate: ""
    });



  const validationSchema = Yup.object({
    _Id: Yup.string().min(12).required("Order Id required"),
    paymentId: Yup.string().min(2).required("Payment Id required"),
    status: Yup.string().required("Must select status"),
    orderDate: Yup.date().required("Order Date must required"),
    deliveryDate: Yup.date().required("Order Date must required"),
  });


  const options = [
    { value: "pending", label: "Pending" },
    { value: "hold", label: "Hold" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];


  const handleSubmit = async (values) => {
    values = { ...values }
    setShowLoader(true)
    const updatedOrder = await axios.patch("http://localhost:4000/api/order", values, { headers: { Accept: "application/json", 'Content-Type': "application/json" } });
    setShowLoader(false)
    navigate('/view-orders')
    // console.log(updatedOrder);
  }

  async function fetchData(orderId) {
    resp = await axios.get("http://localhost:4000/api/order/admin", {
      params: {
        _Id: orderId,
      }
    }, { headers: { Accept: "application/json", 'Content-Type': "application/json" } });
    setInitialValues(resp.data.details[0])
    setShowLoader(false);
  }
  useEffect(() => {
    // console.log("ori = ", initialValues)
    if (!initialValues.paymentId) {
      fetchData(orderId)
    }

  }, [initialValues])

  return (
    <div className="container-fluid">
      <div className="update-order">
        <Card heading="Update Order"/>
        {
          showLoader
            ?
            <Loader />
            :
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form className="mt-3 ml-3 mr-3"  >
                    <div className="row">
                      {/* <div className="col-1"></div> */}
                      <div className="col-6">
                        <InputBox
                          label="Order ID"
                          htmlFor="_Id"
                          name="_Id"
                          id="_Id"
                          value={values._Id}
                          inputClass="form-control"
                          type="text"

                          disabled={true}
                        />
                      </div>
                      <div className="col-6">
                        <InputBox
                          label="Payment ID"
                          htmlFor="paymentId"
                          name="paymentId"
                          placeholder="Enter Payment Id"
                          id="paymentId"
                          inputClass="form-control"
                          type="text"
                          value={values.paymentId}
                          disabled={true}
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                      
                    </div> */}
                    <div className="row">
                      {/* <div className="col-1"></div> */}
                      <div className="col-6">
                        <InputSelector
                          options={options}
                          onChange={(option) => {
                            setFieldValue('status', option.value)
                          }}
                          label="Status"
                          htmlFor="status"
                          value={values.status}
                          name="status"
                          defaultValue={{ value: values.status, label: `${values.status.charAt(0).toUpperCase() + values.status.slice(1)}` }}
                        />
                      </div>
                      {/* <div className="col-1"></div> */}
                      <div className="col-6">
                        <InputBox
                          label="Order Date"
                          htmlFor="orderDate"
                          name="orderDate"
                          placeholder="Enter Order Date"
                          id="orderDate"
                          inputClass="form-control"
                          type="date"
                          value={values.orderDate}
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                     
                    </div> */}
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <InputBox
                          label="Delivery Date"
                          htmlFor="deliveryDate"
                          name="deliveryDate"
                          placeholder="Enter Delivery Date"
                          id="deliveryDate"
                          inputClass="form-control"
                          type="date"
                          value={values.deliveryDate}
                        />
                      </div>
                      <div className="col-3"></div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mt-4 mb-3 float-right">
                          <Button color="primary" type="submit">
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
        }
      </div>
    </div>
  );
}
export default UpdateOrder;