const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//Create a new Web3 and ganache instance and connect with the provider
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initialMessage = "Hi, there!";

beforeEach(async() => {
    //Get a list of accounts
    accounts = await web3.eth.getAccounts();

    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi, there!'] })
        .send({ from: accounts[0], gas: '1000000' })

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    it('has an initial value', async() => {
        const message = await inbox.methods.message().call()
        assert.equal(message, initialMessage);
    });
    it('can modify the message', async() => {
        await inbox.methods.setMessage('Bye, there!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Bye, there!');
    });
});