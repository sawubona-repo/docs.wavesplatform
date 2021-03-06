# SponsorFeeTransaction

Structure of a [Sponsor Fee transaction](/en/blockchain/transaction-type/sponsor-fee-transaction).

## Constructor

``` ride
SponsorFeeTransaction(assetId: ByteVector, minSponsoredAssetFee: Int|Unit, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

## Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | assetId | [ByteVector](/en/ride/data-types/byte-vector)) | [Token ID](/en/blockchain/token/token-id) |
| 2 | minSponsoredAssetFee | [Int](/en/ride/data-types/int)&#124;[Unit](/en/ride/data-types/unit) | Amount of asset that is equivalent to 0.001 WAVES (100,000 WAVELET): an integer value specified in [atomic units](/en/blockchain/token/#atomic-unit).<br>`unit` – disable sponsorship |
| 3 | id | [ByteVector](/en/ride/data-types/byte-vector) | Transaction ID |
| 4 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 5 | timestamp | [Int](/en/ride/data-types/int) | Transaction timestamp |
| 6 | version | [Int](/en/ride/data-types/int) | Transaction version |
| 7 | sender | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of the transaction sender |
| 8 | senderPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the transaction sender |
| 9 | bodyBytes | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction body bytes](/en/blockchain/glossary#t) |
| 10 | proofs | [List](/en/ride/data-types/list)[[ByteVector](/en/ride/data-types/byte-vector)] | [Proofs](/en/blockchain/transaction/transaction-proof) |
