# LeaseCancel

> :warning: The `LeaseCancel` structure is added in [Standard library](/en/ride/script/standard-library) **version 5** which is now available on Stagenet only.

`LeaseCancel` is a structure that sets the lease cancellation parameters. The lease cancellation is performed only if the structure is included in the [callable function result](/en/ride/functions/callable-function#invocation-result-2).

## Constructor

```ride
LeaseCancel(leaseId: ByteVector)
```

## Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | leaseId | [ByteVector](/en/ride/data-types/byte-vector) | Lease ID |
