const products = require("./product-data/products.json")
const categories = require("./product-data/categories.json")
const { convertToListingProducts } = require("./convert")
const { O2OProtocol } = require("../../services")
const Web3 = require("web3")
const HDWalletProvider = require("truffle-hdwallet-provider")

const createDefaultListings = () => {
  const mnemonic = process.env.MNEMONIC || "guide box joke increase brown kick avoid toe wedding sure swift seek"
  const provider = new HDWalletProvider(mnemonic, "http://localhost:8545")
  const web3 = new Web3(provider)

  const { IPFS_ADDRES_API, IPFS_ADDRES_GATEWAY } = process.env
  const ipfsApiPort = IPFS_ADDRES_API || 5001
  const ipfsGatewayPort = IPFS_ADDRES_GATEWAY || 8080

  const ipfsConfig = {
    ipfsApiPort,
    ipfsGatewayPort,
    ipfsDomain: "localhost",
    ipfsProtocol: "http"
  }

  // o2oprotocol services
  const o2o = new O2OProtocol({ web3, ipfsConfig })
  const { contractService, ipfsService } = o2o

  // Deploy default listing by account 0
  const listingProducts = convertToListingProducts({ categories, products })
  const wait = Promise.all(
    listingProducts.map(async listingData => {
      const ipfsHash = await ipfsService.submitFile(listingData)
      const total = await contractService.submitListing(ipfsHash, listingData.price, listingData.unitsAvailable)
      return ipfsHash
    })
  )

  wait.then(console.log)

  // listings.reset()
}

createDefaultListings()

module.exports = {
  createDefaultListings
}
