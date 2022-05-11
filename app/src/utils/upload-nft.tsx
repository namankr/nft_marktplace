import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
import * as fs from "fs";
// import fs from "fs";
import CreateMetaData from "../constants";
import Arweave from "arweave";
import { readFileSync } from "fs";

export default function UploadNft() {
  async function uploadImage() {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
      timeout: 20000,
      logging: false,
    });
    // const fs = require('fs');
    const data = readFileSync("../images/unnamed.jpg");
    // const data = fs.readFileSync("../images/unnamed.jpg");
    console.log(`the image file path - ${data}`);

    const transaction = await arweave.createTransaction({
      data: data,
    });

    transaction.addTag("Content-Type", "image/png");

    const wallet = await arweave.wallets.getWalletFromFile("./wallet.json");
    await arweave.transactions.sign(transaction, wallet);

    const response = await arweave.transactions.post(transaction);
    console.log(response);

    const { id } = response;
    const imageUrl = id ? `https://arweave.net/${id}` : undefined;

    if (imageUrl === undefined) {
      return;
    }

    const metadata = CreateMetaData(imageUrl);

    const metadataRequest = JSON.stringify(metadata);

    const metadataTransaction = await arweave.createTransaction({
      data: metadataRequest,
    });

    metadataTransaction.addTag("Content-Type", "application/json");

    await arweave.transactions.sign(metadataTransaction, wallet);

    await arweave.transactions.post(metadataTransaction);
  }
  return (
    <Container maxWidth="sm">
      <Button variant="contained" onClick={uploadImage}>
        Upload NFT Images to Arweave
      </Button>
    </Container>
  );
}
