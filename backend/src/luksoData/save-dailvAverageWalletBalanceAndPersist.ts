import { getWalletBalance } from './get-walletBalance'
import dayjs from 'dayjs'
import prisma from '../prismaClient'
import { v4 } from 'uuid'

export const saveDailyAverageWalletBalanceAndPersist = async () => {
    try {
        const res = await getWalletBalance()
        if (res !== null) {
            const address: string = res.data.address
            const amount: number = parseFloat(res.data.ether)
            const data = { address, amount }
            console.log(data)

            const uuid = () => v4()

            await prisma.luksoDataAverage.create({
                data: {
                    id: uuid(),
                    address: address,
                    amount: amount
                },
            })

        }
        else {
            return null
        }
        
    } catch (error) {
        console.error(`Error fetchAssets(): ${error}`)
    }
}