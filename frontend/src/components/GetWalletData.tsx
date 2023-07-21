import { useEffect, useState } from "react"

interface WalletBalance {
    address: string
    creationDate: string
    amount: number
}

const GetWalletData = () => {

    const [walletData, setWalletData] = useState<WalletBalance[]>([])

    const fetchWalletData = async () => {
        try {
            const response = await fetch('https://trackingapp-backend.onrender.com/walletBalance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json());
            setWalletData(response)
            console.log(walletData)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchWalletData()
    }, [walletData])

    return (
        <div>
            {walletData &&
                walletData.map((balance: WalletBalance) => (
                    <div>
                        Address:{balance.address} <div>Amount:{balance.amount}</div>
                    </div>
                ))}
        </div>
    )

}

export default GetWalletData