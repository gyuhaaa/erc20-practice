import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import Erc20Connect from "./components/Erc20Connect";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";

const App = () => {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState(null);

  const getNameSymbol = async () => {
    try {
      const nameResponse = await contract.name();
      const symbolResponse = await contract.symbol();

      setName(nameResponse);
      setSymbol(symbolResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getNameSymbol();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      <MetamaskButton signer={signer} setSigner={setSigner} />
      {signer && (
        <div className="mt-16 flex flex-col gap-8 grow max-w-xl w-full">
          <div className="box-style text-center">
            컨트랙트 / 지갑 0x250368BcD73b5B50B8Bdb1F1B3eFa8Bc64F3AEb5
            0x2FFA65948795F91D2FcB6E10c3F8cc4440d416a6
          </div>
          <Erc20Connect name={name} signer={signer} setContract={setContract} />
          {name && (
            <>
              <Balance
                name={name}
                symbol={symbol}
                contract={contract}
                balance={balance}
                setBalance={setBalance}
              />
              <Transfer name={name} symbol={symbol} contract={contract} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
