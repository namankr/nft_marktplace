import Arweave from "arweave";


// export default const arweaveClient = Arweave.init({
//   host: "arweave.net",
//   port: 443,
//   protocol: "https",
//   timeout: 20000,
//   logging: false,
// });

export default function CreateMetaData(imageUrl: string) {
  return {
    name: "Custom NFT #1",
    symbol: "CNFT",
    description: "A description about my custom NFT #1",
    seller_fee_basis_points: 500,
    external_url: "https://www.customnft.com/",
    attributes: [
      {
        trait_type: "NFT type",
        value: "Custom",
      },
    ],
    collection: {
      name: "Test Collection",
      family: "Custom NFTs",
    },
    properties: {
      files: [
        {
          uri: imageUrl,
          type: "image/png",
        },
      ],
      category: "image",
      maxSupply: 0,
      creators: [
        {
          address: "niLPU-KQzWBJSZY4HotSfDlMx9urOWl7VuLfX_haF8w",
          share: 100,
        },
      ],
    },
    image: imageUrl,
  };
}

// export default { CreateMetaData, arweaveClient };