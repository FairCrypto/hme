use anchor_lang::prelude::*;

declare_id!("HTi2H2Gp3xQXNEGb7bR18j8wYDcz4U4PqvBS8p4YYmo1");

#[program]
pub mod hme {
    use super::*;

    pub fn publish(_ctx: Context<Initialize>, data: [u8; 500]) -> Result<()> {
        msg!("{:?}", data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
