export interface WalletModel {
    id: string,
    address: string
    creationDate: Date
    amount: number
}

export interface LuksoAPIModel {
    time: string,
    sequence: string,
    price: string,
    size: string,
    bestBid: string,
    bestBidSize: string,
    bestAsk: string,
    bestAskSize: string
}