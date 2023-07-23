import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface WalletBalance {
    id: string,
    address: string
    creationDate: Date
    amount: number
}

const GetWalletDataWithAverageData = () => {

    const [walletData, setWalletData] = useState<WalletBalance[]>([])
    const [isLoading, setisLoading] = useState(false)

    const fetchWalletData = async () => {
        try {
            setisLoading(true)
            const response = await fetch('https://trackingapp-backend.onrender.com/walletDailyBalance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json());
            setWalletData(response)
            setisLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchWalletData()
    }, [])


    return (
        <Card bg='success' text='white' className="text-center">
            <Card.Title>
                Lukso Staking Rewards Daily Average
            </Card.Title>
            <Card.Body>
                {!isLoading ?
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={walletData}>
                            <Line type="monotone" dataKey="_avg.amount" stroke="white" strokeWidth={3} />
                            <CartesianGrid stroke="white" />
                            <XAxis dataKey="creationDate" angle={-90} textAnchor="end" stroke="white" height={220} />
                            <YAxis stroke="white" />
                        </LineChart>
                    </ResponsiveContainer> :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
            </Card.Body>
        </Card>

    )

}

export default GetWalletDataWithAverageData