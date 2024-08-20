import {workspace, AnchorProvider, web3 } from "@coral-xyz/anchor";
import type {Program} from "@coral-xyz/anchor";
import {Hme} from "../target/types/hme";
import * as anchor from "@coral-xyz/anchor";
import dotenv from 'dotenv'

dotenv.config()

async function main() {

    const provider = AnchorProvider.env();
    anchor.setProvider(provider);
    const connection = provider.connection;

    const program = workspace.Hme as Program<Hme>;

    let transactionList = await connection.getSignaturesForAddress(
        program.programId,
        {limit: 10},
        'confirmed'
    );

    let signatureList = transactionList.map(transaction => transaction.signature);
    let transactionDetails = await connection.getParsedTransactions(signatureList, {
        maxSupportedTransactionVersion: 0,
        commitment: 'confirmed'
    });

    transactionDetails.slice(2,3).forEach((transaction: web3.ParsedTransactionWithMeta, i) => {
        console.log(`Slot: ${transaction.slot}`);
        console.log(`Messages:`);
        transaction.meta.logMessages.forEach(t => console.log(t))
    })
}

main().catch(console.log)