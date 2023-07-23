import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';

interface WalletBalance {
    id: string,
    address: string
    creationDate: Date
    amount: number
}

const CalculateWalletValue = () => {

    const [lastWalletValue, setLastWalletValue] = useState<WalletBalance>()

    const fetchWalletData = async () => {
        try {
            const response = await fetch('https://trackingapp-backend.onrender.com/walletBalance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json());
            const lastElement = response[response.length - 1]
            setLastWalletValue(lastElement)
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
            <Card.Title>Wallet Value</Card.Title>
            <Card.Body>
                {lastWalletValue?.amount} Lyx
            </Card.Body>
        </Card>
    )

}

export default CalculateWalletValue