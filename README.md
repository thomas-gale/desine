# Desine
Decentralized computer aided design licensing concept

# Dev
```shell
yarn
```

- `.env.local`
```shell
NEXT_PUBLIC_ETH_NETWORK_ID=1337 # localhost
NEXT_PUBLIC_DESINE_TOKEN_ADDRESS=****************************************** # check for rich wallets in hardhat and use one in the deployer script 
```

## Terminal 1
```shell
yarn hardhat node
```

## Terminal 2
```shell
yarn hardhat test --typecheck
yarn hardhat run scripts/DesineToken.deployer.ts --network localhost
## Note the Token Address (update the env config)
yarn dev
```

