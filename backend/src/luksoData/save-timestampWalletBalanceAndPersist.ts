import { getWalletBalance } from './get-walletBalance'
import dayjs from 'dayjs'
import prisma from '../prismaClient'
import { v4 } from 'uuid'

export const saveTimestampWalletBalanceAndPersist = async () => {
    try {
        const res = await getWalletBalance()
        if (res !== null) {
            const address: string = res.data.address
            const amount: number = parseFloat(res.data.ether)
            const creationDate: string = dayjs().toISOString()
            const data = { address, creationDate, amount }
            console.log(data)

            const uuid = () => v4()

            await prisma.luksoData.create({
                data: {
                    id: uuid(),
                    address: address,
                    creationDate: creationDate,
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