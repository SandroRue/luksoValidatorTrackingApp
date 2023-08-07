import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { WalletModel } from './FrontendModel'
import { TooltipProps } from 'recharts';
import { ValueType, NameType, } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    if (active) {
        const value = payload?.[0].value
        return (
            <div className="custom-tooltip">
                <p className="label">{`${value}`}</p>
            </div>
        );
    }
    return null;
};

const GetWalletDataWithAverageData = () => {

    const [walletData, setWalletData] = useState<WalletModel[]>([])
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
                            <CartesianGrid stroke="white" strokeDasharray="3 3" />
                            <XAxis dataKey="creationDate" angle={-90} textAnchor="end" stroke="white" height={220} />
                            <YAxis stroke="white" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="_avg.amount" stroke="white" strokeWidth={3} activeDot={{ r: 6 }} />
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