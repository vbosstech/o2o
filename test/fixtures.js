import Web3 from "web3"
import request from "sync-request"
// import { getIpfsConfig } from "../scripts/utils"
import testData from "../contracts/test/TestData.json"

// Get Public IP
const res = request("GET", "http://ipinfo.io/ip");
const publicIp = res.getBody("utf8");
// const iCnf = getIpfsConfig()
const provider = new Web3.providers.HttpProvider(`http://${publicIp}:8545`)

export const web3 = new Web3(provider)

export const ipfsHashes = [
  {
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    bytes32:
      "0x9d6c2be50f706953479ab9df2ce3edca90b68053c00b3004b7f0accbe1e8eedf",
    url: {
      default:
        "https://gateway.o2oprotocol.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      local:
        "http://127.0.0.1:8080/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
    }
  },
  {
    ipfsHash: "QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5",
    bytes32:
      "0x762e65d7166d5cf0eed8541a0b55a79002774f6ef086619202ef749a1bf8f3ba",
    url: {
      default:
        "https://gateway.o2oprotocol.io/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5",
      local:
        "http://127.0.0.1:8080/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5"
    }
  }
]

export const listings = [
  {
    data: {
      foo: "bar"
    },
    ipfsHash: testData.IPFS_HASH,
  }
]

// export const ipfsConfig = {
//   ipfsDomain: publicIp,
//   ipfsApiPort: iCnf.IPFS_API_PORT,
//   ipfsGatewayPort: iCnf.IPFS_GATEWAY_PORT,
//   ipfsGatewayProtocol: "http"
// }

export const ipfsConfig = {
  ipfsDomain: publicIp,
  ipfsApiPort: process.env.IPFS_API_PORT,
  ipfsGatewayPort: process.env.IPFS_GATEWAY_PORT,
  ipfsGatewayProtocol: "http"
}