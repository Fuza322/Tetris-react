import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Tetris from './components/Tetris';
import {NavBar} from "./components/NavBar";
import {GenerateWallet} from "./components/GenerateWallet";
import {LoadWallet} from "./components/LoadWallet";
import {Send} from "./components/Send";
import {History} from "./components/History";


function App() {
    const [authorized, setAuthorized] = useState(false)
    const [goalValue, setGoalValue] = useState(0)

    let [walletName, setWalletName] = useState('')
    let [walletGeneratedName, setWalletGeneratedName] = useState('')
    let [walletPassword, setWalletPassword] = useState('')
    let [walletGeneratedPassword, setWalletGeneratedPassword] = useState('')
    let [balanceValue, setBalanceValue] = useState(0)
    let [solve, setSolve] = useState('')

    let [history, setHistory] = useState([])

    let [send, setSend] = useState([])

    let [addressValue, setAddressValue] = useState('')
    let [amountValue, setAmountValue] = useState('')
    let [feeValue, setFeeValue] = useState('')
    let [sendPasswordValue, setSendPasswordValue] = useState('')
    let [confirmationHours, setConfirmationHours] = useState('24')

    function generateButtonClick() {
        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');
        const key = ec.genKeyPair();
        console.log(key.getPublic());
        const input = new TextEncoder('utf-8').encode(key.getPublic().encode('hex'));
        crypto.subtle.digest('SHA-256', input)
            .then(function(digest) {
                let view = new DataView(digest);
                let hexstr = '';
                for(let i = 0; i < view.byteLength; i++) {
                    let b = view.getUint8(i);
                    hexstr += '0123456789abcdef'[(b & 0xf0) >> 4];
                    hexstr += '0123456789abcdef'[(b & 0x0f)];
                }
                setWalletGeneratedName(hexstr);
            })
            .catch(function(err) {
                console.error(err);
            });
        setWalletGeneratedPassword(key.getPrivate().toString('hex'));
    }

    function loadButtonClick() {
        setWalletName(walletName)
        setAuthorized(true)
    }

    function logOutButtonClick() {
        setWalletName('')
        setAuthorized(false)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    walletName={walletName}
                    balance={balanceValue}
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    logOutButtonClick={logOutButtonClick}
                />
                <Route path='/tetris' render={() =>
                    <Tetris goalValue={goalValue}
                            authorized={authorized}
                            setSolve={setSolve}
                            solve={solve}
                            walletName={walletName}
                            setBalanceValue ={setBalanceValue}
                    />
                }/>
                <Route path='/generate-wallet' render={() =>
                    <GenerateWallet
                        walletGeneratedName={walletGeneratedName}
                        walletGeneratedPassword={walletGeneratedPassword}
                        generateButtonClick={generateButtonClick}
                    />
                }/>
                <Route path='/load-wallet' render={() =>
                    <LoadWallet
                        walletPassword={walletPassword}
                        setWalletPassword={setWalletPassword}
                        setWalletName={setWalletName}
                        setBalanceValue ={setBalanceValue}
                        loadClickButton={loadButtonClick}
                        authorized={authorized}
                        setAuthorized={setAuthorized}
                    />}
                />
                <Route path='/send' render={() =>
                    <Send
                        authorized={authorized}
                        send={send}
                        setSend={setSend}
                        walletName={walletName}
                        addressValue={addressValue}
                        setAddressValue={setAddressValue}
                        amountValue={amountValue}
                        setAmountValue={setAmountValue}
                        feeValue={feeValue}
                        setFeeValue={setFeeValue}
                        sendPasswordValue={sendPasswordValue}
                        setSendPasswordValue={setSendPasswordValue}
                        confirmationHours={confirmationHours}
                        setConfirmationHours={setConfirmationHours}
                        balanceValue={balanceValue}
                        setBalanceValue={setBalanceValue}


                    />}
                />
                <Route path='/history' render={() =>
                    <History
                        authorized={authorized}
                        walletName={walletName}
                        history={history}
                        setHistory={setHistory}
                    />
                }/>
            </div>
        </BrowserRouter>
    )
}

export default App;
