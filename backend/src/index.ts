import prisma from './prismaClient'
import express, { Request, Response } from "express";

import { saveWalletBalanceAndPersist } from './wallet-balance/get-walletBalance'

const main = async () => {
  const app = express()

  const setImmediateDeleteInterval = (callback: () => void, interval: number) => {
    callback() //used that the first result is received at time 0s (instead of the defined number in the interval)
    setInterval(callback, interval)
  }

  setImmediateDeleteInterval(async () => {

    await saveWalletBalanceAndPersist()
    console.log('Data saved')

  }, 1000 * 60 * 60 * 24)

  app.get("/walletBalance", async (req: Request, res: Response) => {
    const walletBalanceData = await prisma.luksoData.findMany({
      where: {
        address: '0xc92f4b3905754ea8e49ea9b4b698d40825ef2743',
      },
      orderBy: {
        creationDate: 'asc'
      },
    });
    res.json(walletBalanceData);
  });

  app.get("/", (req: Request, res: Response) => res.send("OK"))

  app.listen(4000, () => {
    console.log(`Server started at: http://localhost:4000`)
  })
}

main()