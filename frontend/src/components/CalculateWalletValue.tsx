import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import { LuksoAPIModel, WalletModel } from './FrontendModel'

const CalculateWalletValue = () => {

    const [lastWalletValue, setLastWalletValue] = useState<WalletModel>()
    const [luksoPrice, setLuksoPrice] = useState<LuksoAPIModel>()

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
            const response = await fetch('https://trackingapp-backend.onrender.com/luksoPrice', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json());
            setLuksoPrice(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    const lastWalletValueRounded = () => {
        if (lastWalletValue?.amount !== undefined) {
            const lastWalletValueRounded = (lastWalletValue?.amount).toFixed(1)
            return lastWalletValueRounded
        }
        else {
            console.log('No number available')
        }
    }

    const luksoPriceRounded = () => {
        if (luksoPrice?.price !== undefined) {
            const lastLuksoValue = (parseFloat(luksoPrice?.price)).toFixed(1)
            return lastLuksoValue
        }
        else {
            console.log('No number available')
        }
    }

    const calculateWalletValue = () => {
        if (lastWalletValue?.amount !== undefined && luksoPrice !== undefined) {
            const value = lastWalletValue?.amount * parseFloat(luksoPrice?.price)
            return Number((value).toFixed(1))
        }
        else {
            console.log('Calculation failed')
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
                <div>{lastWalletValueRounded()} Lyx</div>
                <div>{luksoPriceRounded()} $</div>
                <div>{calculateWalletValue()} $</div>
            </Card.Body>
        </Card>
    )

}

export default CalculateWalletValue