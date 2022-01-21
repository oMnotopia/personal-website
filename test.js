let walletAddress = '0xfded90a3b1348425577688866f798f94d77a0d02' //Will be an enterable wallet address
let eventType = 'successful' //Will be created/successful/transfer
let createdBeforeDate = '2022-01-01T00%3A00%3A00' //: replaced by %3A
let createdAfterDate = '2022-01-01T00%3A00%3A00'

const options = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': '91ca248444f64fbab1110d7116c6178b'}
};
  
//Fetch Asset from a Specific Wallet Address
fetch(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20&`, options)
.then(response => response.json())
.then(response => {
    console.log('Asset Info')
    console.log(response)
    let assetList = response['assets']
    let pieceNameList = []
    let tokenIDList = []
    let purchasingAddressList = []
    let sellerAddressList = []


    for(let i=0; i<assetList.length; i++) {
        //Piece Name
        pieceNameList[i] = assetList[i].name
        //Token Id
        tokenIDList[i] = assetList[i]['token_id']
        //Purchase Amount

        //Currency Type

        //Purchasing Address
        purchasingAddressList[i] = assetList[i]

        //Seller Address
        sellerAddressList[i] = assetList[i]['asset_contract']['payout_address']
        //Purchase Transaction Hash
        //Sale Date
        //Project Name
        //Platform Fee
        //Sold to Wallet Address
        //Sale Transaction Hash

    }
    console.log(pieceNameList)
    console.log(tokenIDList)
    console.log(purchasingAddressList)
    console.log(sellerAddressList)

})
.catch(err => console.error(err));

//Fetch Event
fetch(`https://api.opensea.io/api/v1/events?account_address=${walletAddress}&event_type=${eventType}&only_opensea=false&offset=0&limit=20&occurred_before=${createdBeforeDate}`, options)
.then(response => response.json())
.then(response => {

    let eventList = response['asset_events']
    let sellerNameList = []
    let sellerAddressList = []
    let buyerNameList = []
    let buyerAddressList = []
    let transactionHashList = []
    let dateOfEventList = []

    let purchaseAmountList = []
    let currencyTypeList = []

    let dateOfEventPostingList = []


    console.log('Event Info')
    console.log(response)

    for (let i=0; i<eventList.length; i++) {
        if(eventType==='transfer'){
            //Seller Name
            sellerNameList[i] = eventList[i]['from_account']['user']
            //Seller Address
            sellerAddressList[i] = eventList[i]['from_account']['address']

            //Buyer Name
            buyerNameList[i] = eventList[i]['to_account']['user']
            //Buyer Address
            buyerAddressList[i] = eventList[i]['to_account']['address']

            //Currency Type

            //Transaction Hash
            transactionHashList[i] = eventList[i]['transaction']['transaction_hash']

            //Date of Event
            dateOfEventList[i] = eventList[i]['transaction']['timestamp']

        } else if (eventType==='created') {
            //Seller Name
            sellerNameList[i] = eventList[i]['from_account']['user']
            //Seller Address
            sellerAddressList[i] = eventList[i]['from_account']['address']

            //Purchase Amount
            purchaseAmountList[i] = eventList[i]['starting_price']
            //Currency Type
            currencyTypeList[i] = eventList[i]['payment_token']['name']

            //Transaction Hash
            transactionHashList[i] = eventList[i]['transaction']['transaction_hash']

            //Date of Event
            dateOfEventList[i] = eventList[i]['transaction']['timestamp']
        } else if (eventType==='successful'){
            //Seller Name
            sellerNameList[i] = eventList[i]['seller']['user']
            //Seller Address
            sellerAddressList[i] = eventList[i]['seller']['address']

            //Buyer Name
            buyerNameList[i] = eventList[i]['winner_account']['user']
            //Buyer Address
            buyerAddressList[i] = eventList[i]['winner_account']['address']

            //Purchase Amount
            purchaseAmountList[i] = eventList[i]['total_price']
            //Currency Type
            currencyTypeList[i] = eventList[i]['payment_token']['name']

            //Transaction Hash
            transactionHashList[i] = eventList[i]['transaction']['transaction_hash']

            //Date of Event Posting
            dateOfEventPostingList[i] = eventList[i]['listing_time']
            //Date of Successful Event 
            dateOfEventList[i] = eventList[i]['created_date']
        }
    }

    console.log(sellerNameList)
    console.log(sellerAddressList)
    console.log(buyerNameList)
    console.log(buyerAddressList)
    console.log(transactionHashList)
    console.log(dateOfEventList)

    console.log(purchaseAmountList)
    console.log(currencyTypeList)

    console.log(dateOfEventPostingList)
    console.log(dateOfEventList)

})
.catch(err => console.error(err));





