import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface WalletBalance {
    id: string,
    address: string
    creationDate: Date
    amount: number
}

const GetWalletDataWithAverageDate = () => {

    const [walletData, setWalletData] = useState<WalletBalance[]>([])

    const fetchWalletData = async () => {
        try {
            const response = await fetch('https://trackingapp-backend.onrender.com/walletDailyBalance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json());
            setWalletData(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchWalletData()
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col></Col>
                <Col xs={10}>
                    <Card bg='success' text='white' className="text-center">
                        <Card.Title>
                            Lukso Staking Rewards Daily Average
                        </Card.Title>
                        <Card.Body>
                            <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={walletData}>
                                    <Line type="monotone" dataKey="_avg.amount" stroke="white" strokeWidth={3} />
                                    <CartesianGrid stroke="white" />
                                    <XAxis dataKey="creationDate" angle={-90} textAnchor="end" stroke="white" height={220} />
                                    <YAxis stroke="white" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                    <Col></Col>
            </Row>
        </Container>

    )

}

export default GetWalletDataWithAverageDate