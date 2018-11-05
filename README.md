# Grace

The decentralized web allows the common person to send funds instantaneously and securely upon completion of a smart contract. Grace showcases this possibility with the use of an ad placement platform.

The idea behind this project is as follows:

A web developer wants to control the ad content placed on his/her website. He/she also wants to be paid instantly upon one million clicks on the ad.

A technologically aware advertiser wants to embrace the oncoming change of blockchain and seeks to facilitate payment to the web developer with minimal hassle.

Grace allows advertisers to upload bundles of ads to our website. Web developers select ads, and upon checking out a bundle of ads, they receive a script tag that they can easily post to their website. Simultaneously, a smart contract between the advertiser and web developer is generated. The advertiser receives an e-mail asking him/her to deposit payment into the contract. Upon clicking a magic link in the e-mail, the advertiser can easily input his/her ethereum address and deposit funds into the contract - no login required.

Meantime, the script tag serves up a new ad from the bundle every time the webpage is rendered. Clicks on the ad hit our database via XML request. Upon a million clicks, payment is deposited into the web developer's and Grace's accounts in a 75-25% split.

Everyone goes home happy - the web developer can count on being paid immediately upon fulfillment of a contract and the advertiser gets the convenience of sending funds directly through the blockchain, and not having to interface with any third parties.

HOW

Solidity smart contracts that are deployed on Ganache testnet (serving as a placeholder for the Ethereum main chain) store funds deposited by the advertiser as well as the web developer's ethereum address.
