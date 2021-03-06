import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditDoctorInfo() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [detailError, setDetailError] = useState("");

    let navigate = useNavigate();

    const [doctor, setDoctor] = useState([]);
    const [user, setUser] = useState([]);

    
    useEffect(() => {
        const doctors = JSON.parse(localStorage.getItem("accessToken"));
        if (doctors) {
            setDoctor(doctors);
            console.log(doctor);
        }

    //     oldDoctor();
    //    // setId(doctor.id);
    //     setUsername(doctor.username);
    //     setPassword(doctor.password);
    //     setName(doctor.fullName);
    //     setSex(doctor.sex);
    //     setPhoneNumber(doctor.phoneNumber);
    //     setEmail(doctor.email);
    //     setDateOfBirth(doctor.birth);
    //     setAddress(doctor.address);
    //     setTitle(user.department == null ? "" : user.department.title);
    //     setDetail(user.department == null ? "" : user.department.title);
    },[]);

    const oldDoctor = () => {
        axios
            .get('http://localhost:8084/User/getDoctorById/' + doctor.id)
            .then((res) => {
                setUser(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => console.log(error)
            );
    }
    let formIsValid = true;

    const handleValidation = () => {

        if (!username) {
            formIsValid = false;
            setUsernameError("T??n ????ng nh???p kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setUsernameError("");
            formIsValid = true;
        }

        if (!password) {
            formIsValid = false;
            setPasswordError("M???t kh???u kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setPasswordError("");
            formIsValid = true;
        }

        if (!name) {
            formIsValid = false;
            setNameError("T??n kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        if (!phoneNumber) {
            formIsValid = false;
            setPhoneNumberError("S??? ??i???n tho???i kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setPhoneNumberError("");
            formIsValid = true;
        }

        if (!email) {
            formIsValid = false;
            setEmailError("Email kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setEmailError("");
            formIsValid = true;
        }

        if (!dateOfBirth) {
            formIsValid = false;
            setDateOfBirthError("Ng??y sinh kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setDateOfBirthError("");
            formIsValid = true;
        }

        if (!address) {
            formIsValid = false;
            setAddressError("?????a ch??? kh??ng ???????c ????? tr???ng");
            return false;
        } else {
            setAddressError("");
            formIsValid = true;
        }

        return formIsValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation();
        console.log(username + password + name + phoneNumber + email + dateOfBirth + address);
        axios
            .put('http://localhost:8084/User/update/' + doctor.id, {
                username: username,
                password: password,
                fullName: name,
                sex: sex,
                phoneNumber: phoneNumber,
                email: email,
                birth: dateOfBirth,
                address: address,
                level: 2
            })
            .then((res) => {
                console.log(res.data);
                if (!formIsValid) {
                    alert("H??y ??i???n ????? th??ng tin!");
                } else {
                    alert("C???p nh???t th??ng tin th??nh c??ng!");
                    localStorage.setItem("accessToken", JSON.stringify(res.data.data));
                }

            })
            .catch((error) => console.log(error)
            );

        axios
            .put('http://localhost:8084/Department/update', {
                id: doctor.department.id,
                title: title,
                detail: detail
            })
            .then((res) => console.log(res.data.data))
            .catch((error) => console.log(error));
    };

    console.log(sex);

    return (
        <Container>
            <div className="flex-row mt-4">
                <Link to={"/"}>Trang ch???</Link> / Th??ng tin b??c s?? / S???a th??ng tin b??c s??
            </div>
            <div className="text-center">
                <h2>S???A TH??NG TIN B??C S??</h2>
            </div>
            <div className="align-items-center d-flex justify-content-center">
                <div className="col-md-8 ">
                    <Form className="row mt-3 " onSubmit={handleSubmit}>
                        <Form.Group className="col-md-12 mb-3" >
                            <Form.Label>T??n ????ng nh???p</Form.Label>
                            <Form.Control type="text" defaultValue={doctor.username} onChange={(e) => setUsername(e.target.value)} readOnly />
                            <small className="text-danger form-text">
                                {usernameError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>M???t kh???u</Form.Label>
                            <Form.Control type="text" defaultValue={doctor.password} onChange={(e) => setPassword(e.target.value)} />
                            <small className="text-danger form-text">
                                {passwordError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>H??? t??n</Form.Label>
                            <Form.Control type="text" defaultValue={doctor.fullName} onChange={(e) => setName(e.target.value)} />
                            <small className="text-danger form-text">
                                {nameError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3 blog-checkbox">
                            <Form.Label>Gi???i t??nh: </Form.Label>
                            <div className="d-flex">
                                <Form.Check className="me-3" type="radio" defaultChecked={doctor.sex ? true : false} onChange={() => setSex(true)} label="Nam" />
                                <Form.Check className="me-3" type="radio" defaultChecked={doctor.sex ? false : true} onChange={() => setSex(false)} label="N???" />
                            </div>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>S??? ??i???n tho???i</Form.Label>
                            <Form.Control type="number" defaultValue={doctor.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <small className="text-danger form-text">
                                {phoneNumberError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={doctor.email} onChange={(e) => setEmail(e.target.value)} />
                            <small className="text-danger form-text">
                                {emailError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>Ng??y sinh</Form.Label>
                            <Form.Control type="date" defaultValue={doctor.birth} onChange={(e) => setDateOfBirth(e.target.value)} />
                            <small className="text-danger form-text">
                                {dateOfBirthError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>?????a ch???</Form.Label>
                            <Form.Control type="text" defaultValue={doctor.address} onChange={(e) => setAddress(e.target.value)} />
                            <small className="text-danger form-text">
                                {addressError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>Chuy??n khoa</Form.Label>
                            <Form.Control type="text" defaultValue={user.department == null ? "" : user.department.title} onChange={(e) => setTitle(e.target.value)} />
                            <small className="text-danger form-text">
                                {titleError}
                            </small>
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-3">
                            <Form.Label>Kinh nghi???m l??m vi???c</Form.Label>
                            <Form.Control as="textarea" defaultValue={user.department == null ? "" : user.department.detail} rows={6} onChange={(e) => setDetail(e.target.value)} />
                            <small className="text-danger form-text">
                                {detailError}
                            </small>
                        </Form.Group>
                        <div className="mt-1 text-center">
                            <Button type="submit">X??c nh???n</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    )
}
export default EditDoctorInfo;