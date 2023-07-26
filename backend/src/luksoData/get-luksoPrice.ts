export const fetchLuksoPriceData = async () => {
    try {
        const res = await fetch('https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=LYX-USDT', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await res.json();
        console.log(result.data)
        return result.data
    }
    catch (err) {
        console.log(err)
    }
}