export const getWalletBalance = async () => {
    try {
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