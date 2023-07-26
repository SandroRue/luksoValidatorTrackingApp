import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import { WalletModel } from './DatabaseModel'

const CalculateWalletValue = () => {

    const [lastWalletValue, setLastWalletValue] = useState<WalletModel>()
    const [luksoPrice, setLuksoPrice] = useState()

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

    const fetchPriceData = async () => {
        try {
            const response = await fetch('https://trackingapp-backend.onrender.com/walletBalance/luksoPrice', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain',
                }
            }).then((response) => response.json());
            setLuksoPrice(response.price)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchWalletData()
        fetchPriceData()
    }, [])


    return (
        <Card bg='success' text='white' className="text-center">
            <Card.Title>Wallet Value</Card.Title>
            <Card.Body>
                {lastWalletValue?.amount} Lyx - {luksoPrice} $
            </Card.Body>
        </Card>
    )

}

export default CalculateWalletValue