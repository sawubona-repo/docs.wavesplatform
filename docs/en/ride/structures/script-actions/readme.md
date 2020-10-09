# Script Actions

Script actions are executed, that is, they make changes on the blockchain only if they are included in the resulting expression of the callable function. See more details in the [Callable function](/en/ride/functions/callable-function) article.

Available script actions depend on [Standard library](/en/ride/script/standard-library) version used.

> Standard library version 5 is added in node version 1.3.0 and enabled with feature #16 “Continuations”. Versions 1.3.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

| Action | v5 | v4 | v3 | Description |
|---|---|---|---|---|
| [BinaryEntry](/en/ride/structures/script-actions/binary-entry) |✓ | ✓ | | Add or modify a binary entry of the [account data storage](/en/blockchain/account/account-data-storage) |
| [BooleanEntry](/en/ride/structures/script-actions/boolean-entry) | ✓ | ✓ | | Add or modify a boolean entry |
| [Burn](/en/ride/structures/script-actions/burn) | ✓ | ✓ | | Burn a token |
| [DataEntry](/en/ride/structures/script-actions/data-entry) | | | ✓ | Add or modify an entry of any type |
| [DeleteEntry](/en/ride/structures/script-actions/delete-entry) | ✓ | ✓ | | Delete an entry |
| [IntegerEntry](/en/ride/structures/script-actions/int-entry) |✓ | ✓ | | Add or modify an integer entry |
| [Issue](/en/ride/structures/script-actions/issue) | ✓ | ✓ | | Issue a token |
| [Lease](/en/ride/structures/script-actions/issue) | ✓ | | | Lease |
| [LeaseCancel](/en/ride/structures/script-actions/issue) | ✓ | | | Cancel lease |
| [Reissue](/en/ride/structures/script-actions/reissue) | ✓ | ✓ | | Reissue a token |
| [ScriptTransfer](/en/ride/structures/script-actions/script-transfer) | ✓ | ✓ | ✓ | Transfer a token |
| [SponsorFee](/en/ride/structures/script-actions/sponsor-fee) | ✓ | ✓ | | Set up a sponsorship |
| [StringEntry](/en/ride/structures/script-actions/string-entry) | ✓ | ✓ | | Add or modify a string entry |
