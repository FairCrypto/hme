import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Hme } from "../target/types/hme";
import { randomBytes } from 'crypto'

describe("hme", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Hme as Program<Hme>;

  it("Is writing calldata to logs", async () => {
    // Add your test here.
    console.log('writing calldata...')
    for await (const i of [0, 1, 2, 3, 4, 5, 6]) {
      const data = randomBytes(500).slice(0)

      const tx = await program.methods.publish([...new Uint8Array(data)]).rpc();
      console.log("    sig=", tx);
    }
  });
});
