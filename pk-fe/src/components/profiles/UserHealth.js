import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserHealth() {

    const [user, setUser] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("accessToken"));
    const { id } = useParams();
    const isDoctor = () => {
        if (userInfo.role === "Doctor") {
            return (
                <Link to={"/add-new-record/" + user.id}>
                    <Button>
                        Thêm mới hồ sơ
                    </Button>
                </Link>
            )
        }

    }
    const  getUser=()=>{
        const users = JSON.parse(localStorage.getItem("accessToken"));
        if (users) {
            setUser(users);
            console.log(user);
        }
    }
   
    useEffect(() => {

        axios
            .get('http://localhost:8084/Heath/getAllHeathByIdUser/' + id)
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((error) => console.log(error));
    });

    return (
        <Container>
            <div className="flex-row">
                <Link to={"/"}>Trang chủ</Link> / Hồ sơ sức khỏe / Quang
            </div>
            <div className="text-center">
                <h2>HỒ SƠ SỨC KHỎE</h2>
            </div>
            <Container className="mt-4 w-75 h-25">
                <Card className="mt-3">
                    <Card.Header as="h5">{user.time}</Card.Header>
                    <Card.Body>
                        <Card.Title>Khách hàng: {user.fullName}</Card.Title>
                        <Card.Text>
                            Giờ khám: {user.time}
                        </Card.Text>
                        <Card.Text>
                            Triệu chứng: {user.symptom}
                        </Card.Text>
                        {isDoctor()}
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    )
}

export default UserHealth;