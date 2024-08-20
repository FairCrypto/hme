import {workspace, AnchorProvider, setProvider,} from "@coral-xyz/anchor";
import type {Program} from "@coral-xyz/anchor";
import {Hme} from "../target/types/hme";
import * as anchor from "@coral-xyz/anchor";
import dotenv from 'dotenv'

dotenv.config()

async function main() {

    const provider = AnchorProvider.env();
    anchor.setProvider(anchor.AnchorProvider.env());
    const connection = provider.connection;

    const program = workspace.GrowSpace as Program<Hme>;

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

    transactionDetails.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime * 1000);
        console.log(`Transaction No: ${i + 1}`);
        console.log(`Messages:`);
        transaction.meta.logMessages.forEach(console.log)
    })
}

main().catch(console.log)