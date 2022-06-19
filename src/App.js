import {useState, useEffect} from "react";

function CoinTemp({coins, onChange}){
    return(
        <select onChange={onChange}>
        {coins.map((coin, idx) => (
                <option key={coin.id} value={coin.quotes.USD.price}  name={coin.symbol}>
                    {coin.name} ({coin.symbol}) Price : $ {coin.quotes.USD.price} USD
                </option>
            )
        )}
        </select>
    )
}

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [usd, setUsd] = useState(0);
    const [coin, setCoin] = useState(0);
    const [rst, setRst] = useState("");
    useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((res) => res.json())
            .then((data) => {
                setCoins(data);
                setLoading(false);
                setCoin(data[0].quotes.USD.price);
            });
    }, [])


    const usdChange = (event) => {
        setUsd(event.target.value);
    };

    const exChange = () => {
        setRst("$ " + usd +" USD -> "+ usd/coin);
    };

    const selectChange = (event) => {
        setCoin(event.target.value);
    };

    return (
        <div>
            <h1>The Coins</h1>
            {loading ? <h2>Loding.....</h2> : <CoinTemp coins={coins} onChange={selectChange}/>}
            <br/>
            USD <input type="number" value={usd} onChange={usdChange}/>  <button onClick={exChange}>환전</button>
            <h1>{rst}</h1>

        </div>
    )
}
// https://api.coinpaprika.com/v1/tickers
export default App;
