# SetScriptTransaction

Структура [транзакции установки скрипта](/ru/blockchain/transaction-type/set-script-transaction).

## Конструктор

``` ride
SetScriptTransaction(script: ByteVector|Unit, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

## Поля структуры

| № | Название | Тип данных | Описание |
| :--- | :--- | :--- | :--- |
| 1 | script | [ByteVector](/ru/ride/data-types/byte-vector)&#124;[Unit](/ru/ride/data-types/unit) | [Скрипт аккаунта](/ru/ride/script/script-types/account-script) или [dApp-скрипт](/ru/ride/script/script-types/dapp-script) |
| 2 | id | [ByteVector](/ru/ride/data-types/byte-vector) | ID транзакции |
| 3 | fee | [Int](/ru/ride/data-types/int) | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) |
| 4 | timestamp | [Int](/ru/ride/data-types/int) | Временная метка транзакции |
| 5 | version | [Int](/ru/ride/data-types/int) | Версия транзакции |
| 6 | sender | [Address](/ru/ride/structures/common-structures/address) | [Адрес](/ru/blockchain/account/address) отправителя транзакции |
| 7 | senderPublicKey | [ByteVector](/ru/ride/data-types/byte-vector) | Открытый ключ отправителя транзакции |
| 8 | bodyBytes | [ByteVector](/ru/ride/data-types/byte-vector) | [Байты тела транзакции](/ru/blockchain/glossary#б) |
| 9 | proofs | [List](/ru/ride/data-types/list)[[ByteVector](/ru/ride/data-types/byte-vector)] | [Подтверждения](/ru/blockchain/transaction/transaction-proof) |
