const express = require("express");
const app = express();

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

  app.get("/", (req:any, res:any) => res.send("OK"))

  app.listen(4000, () => {
    console.log(`Server started at: http://localhost:4000`)
  })
}

main()