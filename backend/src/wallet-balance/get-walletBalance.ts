import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

export const getWalletBalance = async () => {
    try{
        const res = await fetch('https://explorer.consensus.mainnet.lukso.network/api/v1/execution/address/0xc92F4b3905754eA8E49Ea9B4B698d40825eF2743', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json();
        return result
    }

    catch (err) {
        console.log(err)
        return null
    }
}

export const saveWalletBalanceAndPersist = async () => {
    const res = await getWalletBalance()
    if (res !== null) {
        const address: string = res.data.address
        const amount: number = parseFloat(res.data.ether)
        const creationDate = dayjs().toISOString()
        const data = {address, creationDate, amount}
        console.log(data)

        const prisma = new PrismaClient()
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
}