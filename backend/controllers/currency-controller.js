exports.exchange = async (req, res, next) => {
    const { currencies } = req.body

    if (!currencies || !Array.isArray(currencies) || currencies.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of currency codes.' });
    }

    try {
        const exchangeRates = {}

        for (const currency of currencies) {
            const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`)
            if (!response.ok) {
                console.error(`Failed to fetch data for ${currency}: ${response.statusText}`)
                exchangeRates[currency] = { error: 'Unable to fetch data' }
                continue;
            }

            const data = await response.json()
            exchangeRates[currency] = {
                currency: data.currency,
                code: data.code,
                rate: data.rates[0].mid,
                effectiveDate: data.rates[0].effectiveDate
            }
        }

        res.status(200).json({message: 'success', data: exchangeRates});
    } catch (err) {
        next(err)
    }
}