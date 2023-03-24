import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { axiosPut, getData, saveData } from "../../services/Api";
import InputBox from "../molecules/InputBox";
import InputSelector from "../molecules/InputSelector";
import * as Yup from "yup";
import Loader from "../atoms/Loader";
import { isMongoId } from "../../services/services";

function UserSellerDetails() {
	const { id: userId } = useParams();
	const locationData = useLocation();

	const isEditUserMode = isMongoId(userId);

	const [statesObject, setStatesObject] = useState({
		initialValues: {
			firstName: "",
			lastName: "",
			emailId: "",
			contactNumber: "",
			role: "Select",
			password: "",
			confirmPassword: "",
			address: {
				name: "",
				contactNumber: "",
				pincode: "",
				street: "",
				locality: "",
				city: "Select",
				state: "Select",
				country: "Select",
			},
			companyName: "",
			rating: 0,
		},
		loader: true,
		countries: [],
		selectedCountryId: "",
		states: [],
		selectedStateId: "",
		cities: [],
	});

	useEffect(() => {
		if (isEditUserMode) {
			setStates("loader", true);

			getData(`user/${userId}`)
				.then((data) => {
					console.log("data = ", data.user);
					const tempObj = {
						...data.user,
						address: data.user.sellerAdditionalData.address,
						companyName: data.user.sellerAdditionalData.companyName,
						rating: data.user.sellerAdditionalData.rating,
					};
                    
					if (data.status) {
						setObject("initialValues", tempObj);
					}
					setStates("loader", false);
				})
				.catch((err) => {
					console.log("err = ", err);
				});
		} else {
			setStates("loader", false);
		}
	}, []);
	console.log(" initial values = ", statesObject.initialValues);

	const validation = Yup.object({
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
		emailId: Yup.string()
			.email("please enter valid emailId ")
			.required("Required"),
		password: Yup.string()
			.min(8, "Password must has 8 characters")
			.required("Required")
			.test("isEditUserMode", "Invalid Mode", (value) => {
				console.log("value password = ", value);

				return true;
			}),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Required"),
		contactNumber: Yup.string()
			.matches(/^[6-9]{1}[0-9]{9}$/, "please enter valid phone number")
			.required("Required"),
		role: Yup.string().required("Required"),

		companyName: Yup.string().when("role", {
			is: (role) => role === "seller",
			then: () => Yup.string().required("Required"),
			otherwise: () => Yup.string(),
		}),
		rating: Yup.string(),

		address: Yup.object().when("role", {
			is: (role) => role === "seller",
			then: () =>
				Yup.object({
					name: Yup.string().required("Required"),
					contactNumber: Yup.string()
						.matches(/^[6-9]{1}[0-9]{9}$/, "please enter valid phone number")
						.required("Required"),
					pincode: Yup.string()
						.matches(/^[0-9]{6}$/, "please enter valid pincode")
						.required("Required"),
					street: Yup.string().required("Required"),
					locality: Yup.string().required("Required"),
					city: Yup.string().required("Required"),
					state: Yup.string().required("Required"),
					country: Yup.string().required("Required"),
				}),
			otherwise: () =>
				Yup.object({
					name: Yup.string(),
					contactNumber: Yup.string(),
					pincode: Yup.string(),
					street: Yup.string(),
					locality: Yup.string(),
					city: Yup.string(),
					state: Yup.string(),
					country: Yup.string(),
				}),
		}),
	});

	const roles = [
		{ value: "admin", label: "admin" },
		{ value: "seller", label: "seller" },
		{ value: "user", label: "user" },
	];

	useEffect(() => {
		async function fetchCountries() {
			const data = await getData("address/countries");
			setData(data.data, "countries");
		}

		fetchCountries();
	}, []);

	useEffect(() => {
		if (statesObject.selectedCountryId !== "") {
			async function fetchStates() {
				const data = await getData(
					`address/states/${statesObject.selectedCountryId}`
				);
				setStates("states", []);
				setData(data.data, "states");
			}

			fetchStates();
		}
	}, [statesObject.selectedCountryId]);

	useEffect(() => {
		if (statesObject.selectedStateId !== "") {
			async function fetchStates() {
				const data = await getData(
					`address/cities/${statesObject.selectedStateId}`
				);
				setStates("cities", []);
				setData(data.data, "cities");
			}

			fetchStates();
		}
	}, [statesObject.selectedStateId]);

	function setData(data, key) {
		data?.map((value) => {
			setStatesObject((prevStates) => {
				return {
					...prevStates,
					[key]: [
						...prevStates[key],
						{ id: value.id, label: value.name, value: value.name },
					],
				};
			});
		});
	}

	function setObject(stateKey, data) {
		Object.keys(data).map((key) => {
			setStatesObject((prevStates) => {
				return {
					...prevStates,
					[stateKey]: { ...prevStates[stateKey], [key]: data[key] },
				};
			});
		});
	}

	function setStates(key, value) {
		setStatesObject((prevStates) => {
			return { ...prevStates, [key]: value };
		});
	}

	return (
		<div>
			{statesObject.loader ? (
				<Loader />
			) : (
				<Formik
					initialValues={statesObject.initialValues}
					validationSchema={validation}
					enableReinitialize={true}
					onSubmit={(values, { resetForm, setFieldValue }) => {
						const tempObj = { ...values, address: { ...values.address } };
						delete tempObj.confirmPassword;

						async function createUser() {
							try {
								const data = await saveData("user", tempObj);
								console.log(" data = ", data);
								setStates("loader", false);
								if (data.status) {
									alert(data.message);
									resetForm();
								} else {
									alert(data.message);
								}
							} catch (e) {
								setStates("loader", false);
								alert(e.message);
							}
						}

						async function updateUser() {
							try {
								console.log("user = ", tempObj);
								const data = await axiosPut(`user/${userId}`, tempObj);

								setStates("loader", false);
								if (data.status) {
									alert(data.message);
									resetForm();
								} else {
									alert(data.message);
								}
							} catch (e) {
								setStates("loader", false);
								alert(e.message);
							}
						}

						setStates("loader", true);
						if (isEditUserMode) {
							updateUser();
						} else {
							createUser();
						}
					}}
				>
					{({ values, setFieldValue }) => {
						return (
							<>
								{statesObject.loader ? <Loader /> : null}

								<Form>
									<div className="row">
										<div className="col-lg-6">
											<InputBox
												htmlFor="firstName"
												label="First Name"
												type="text"
												name="firstName"
												placeholder="Enter first name"
												inputClass="form-control"
											/>
										</div>

										<div className="col-lg-6">
											<InputBox
												htmlFor="lastName"
												label="Last Name"
												type="text"
												name="lastName"
												placeholder="Enter last name"
												inputClass="form-control"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-6">
											<InputBox
												htmlFor="contactNumber"
												label="Contact Number"
												type="text"
												name="contactNumber"
												placeholder="Enter contact Number"
												inputClass="form-control"
											/>
										</div>

										<div className="col-lg-6">
											<InputBox
												htmlFor="emailId"
												label="Email"
												type="text"
												name="emailId"
												placeholder="Enter emailId"
												inputClass="form-control"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-6">
											<InputBox
												htmlFor="password"
												label="Password"
												type="password"
												name="password"
												placeholder="Enter Password"
												inputClass="form-control"
											/>
										</div>

										<div className="col-lg-6">
											<InputBox
												htmlFor="confirmPassword"
												label="Confirm Password"
												type="password"
												name="confirmPassword"
												placeholder="Enter Confirm Password"
												inputClass="form-control"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-6">
											<InputSelector
												defaultValue={{
													label: values.role,
													value: values.role,
												}}
												options={roles}
												onChange={(option) =>
													setFieldValue("role", option.value)
												}
												label="Role"
												htmlFor="role"
												name="role"
												value={values.role}
											/>
										</div>
									</div>

									{values.role == "seller" ? (
										<div>
											<div className="row">
												<div className="col-lg-6">
													<InputBox
														htmlFor="companyName"
														label="Company Name"
														type="text"
														name="companyName"
														placeholder="Enter company name"
														inputClass="form-control"
													/>
												</div>
												<div className="col-lg-6">
													<InputBox
														htmlFor="rating"
														label="Rating"
														type="text"
														name="rating"
														placeholder="Enter rating"
														inputClass="form-control"
														disabled={true}
													/>
												</div>
											</div>

											<h5 className="my-3">Address of Warehouse</h5>

											<div className="row">
												<div className="col-lg-6">
													<InputBox
														htmlFor="name"
														label="Name"
														type="text"
														name="address.name"
														placeholder="Enter name"
														inputClass="form-control"
													/>
												</div>
												<div className="col-lg-6">
													<InputBox
														htmlFor="contactNumber"
														label="Contact Number"
														type="text"
														name="address.contactNumber"
														placeholder="Enter contact number"
														inputClass="form-control"
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6">
													<InputBox
														htmlFor="pincode"
														label="Pincode"
														type="text"
														name="address.pincode"
														placeholder="Enter pincode"
														inputClass="form-control"
													/>
												</div>
												<div className="col-lg-6">
													<InputBox
														htmlFor="street"
														label="Street"
														type="text"
														name="address.street"
														placeholder="Enter street"
														inputClass="form-control"
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6">
													<InputBox
														htmlFor="locality"
														label="Locality"
														type="text"
														name="address.locality"
														placeholder="Enter locality"
														inputClass="form-control"
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-4">
													<InputSelector
														defaultValue={{
															label: values.address.country,
															value: values.address.country,
														}}
														options={statesObject.countries}
														onChange={(option) => {
															// setSelectedCountryId(option.id);
															setStates("selectedCountryId", option.id);
															setFieldValue("address.country", option.value);
														}}
														label="Country"
														htmlFor="country"
														value={values.address.country}
													/>
												</div>
												<div className="col-lg-4">
													<InputSelector
														defaultValue={{
															label: values.address.state,
															value: values.address.state,
														}}
														options={statesObject.states}
														onChange={(option) => {
															// setSelectedStateId(option.id);
															setStates("selectedStateId", option.id);
															setFieldValue("address.state", option.value);
														}}
														label="State"
														htmlFor="state"
														value={values.address.state}
													/>
												</div>
												<div className="col-lg-4">
													<InputSelector
														defaultValue={{
															label: values.address.city,
															value: values.address.city,
														}}
														options={statesObject.cities}
														onChange={(option) => {
															setFieldValue("address.city", option.value);
														}}
														label="City"
														htmlFor="city"
														value={values.address.city}
													/>
												</div>
											</div>
										</div>
									) : null}

									<Button className="mt-3" type="submit" color="primary">
										{locationData.pathname === "/add-user-seller"
											? `Add ${values.role !== "Select" ? values.role : ""}`
											: "Update"}
									</Button>
								</Form>
							</>
						);
					}}
				</Formik>
			)}
		</div>
	);
}

export default UserSellerDetails;
