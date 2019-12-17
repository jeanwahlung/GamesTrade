pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string description;
        string image;
        uint price;
        address  payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string description,
        string image,
        uint price,
        address payable owner,
        bool purchased
    );
     event ProductUpdate(
        string name,
        string description,
        string image,
        uint price
      
    );
    event ProductDelete(uint id);
    event ProductPurchased(
        uint id,
        string name,
        string description,
        string image,
        uint price,
        address payable owner,
        bool purchased
    );
     event ProductTrade(
        uint id,
        string name,
        string description,
        string image,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "GameTrade";
    }

    function createProduct(string memory _name,string memory _description, string memory _image, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
       
        // require a valid description
        require(bytes(_description).length > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _description,_image,_price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name,_description, _image, _price, msg.sender, false);
    }
    function updateProduct(uint _id ,string memory _name, string memory _description, string memory _image, uint _price) public payable returns (bool success){
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        require(_seller == msg.sender);
       //This has a problem we need loop
       for(uint256 i =0; i<=productCount; i++){
           if(products[i].id ==_id){
              products[i].name = _name;
              products[i].description = _description;
              products[i].image = _image;
              products[i].price = _price;
              emit ProductUpdate(_name, _description, _image,_price);
              return true;
           }
       }
       return false;
   }
   function deleteProduct(uint _id) public returns(bool success){
        require(productCount > 0);
        for(uint256 i =0; i<= productCount; i++){
           if(products[i].id == _id){
                products[i] = products[productCount-1]; 
                delete products[productCount-1];
                //emit event
                emit ProductDelete(_id);
                return true;
           }
       }
       return false;
   }
 
 
    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
       
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = false;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.description,_product.image,_product.price, msg.sender, true);

    }
      function purchaseTrade(uint _id,uint _id2) public payable {
        // Fetch the product
        Product memory _product = products[_id];
         Product memory _product2 = products[_id2];
        // Fetch the owner
        address payable _seller = _product.owner;
        
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
       _product.owner = msg.sender  ;
        // Transfer ownership to the buyer
        _product2.owner = _seller;
       
        // Mark as purchased
        _product.purchased = false;
        // Update the product
        products[_id] = _product;
        products[_id2] = _product2;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.description,_product.image,_product.price, msg.sender, true);

    }
    
   
}