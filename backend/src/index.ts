import prisma from './prismaClient'
import express, { Request, Response } from "express";

import { saveTimestampWalletBalanceAndPersist } from './luksoData/save-timestampWalletBalanceAndPersist'
import { saveDailyAverageWalletBalanceAndPersist } from './luksoData/save-dailvAverageWalletBalanceAndPersist';

const main = async () => {
  const app = express()

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });

  const setImmediateDeleteInterval = (callback: () => void, interval: number) => {
    callback() //used that the first result is received at time 0s (instead of the defined number in the interval)
    setInterval(callback, interval)
  }

  setImmediateDeleteInterval(async () => {

    await saveTimestampWalletBalanceAndPersist()
    await saveDailyAverageWalletBalanceAndPersist()
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

  app.get("/walletDailyBalance", async (req: Request, res: Response) => {
    const dailyAverage = await prisma.luksoDataAverage.groupBy({
      where: {
        address: '0xc92f4b3905754ea8e49ea9b4b698d40825ef2743',
      },
      by: ['creationDate'],
      _avg: {
        amount: true,
      },
      orderBy: {
        creationDate: 'asc'
      },
    });
    res.json(dailyAverage);
  });

  app.get("/", (req: Request, res: Response) => res.send("OK"))

  app.listen(4000, () => {
    console.log(`Server started at: http://localhost:4000`)
  })
}

main()