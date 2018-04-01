pragma solidity ^0.4.11;

/// @title Listing
/// @dev An indiviual O2O Listing representing an offer for booking/purchase

import "./Purchase.sol";

contract Listing {

  /*
   * Events
   */

  event ListingPurchased(Purchase _purchaseContract);

    /*
    * Storage
    */

    address public owner;
    address public listingRegistry; // TODO: Define interface for real ListingRegistry ?
    // Assume IPFS defaults for hash: function:0x12=sha2, size:0x20=256 bits
    // See: https://ethereum.stackexchange.com/a/17112/20332
    // This assumption may have to change in future, but saves space now
    bytes32 public ipfsHash;
    uint public price;
    uint public unitsAvailable;
    Purchase[] public purchases;


    function Listing (
      address _owner,
      bytes32 _ipfsHash,
      uint _price,
      uint _unitsAvailable
    )
    public
    {
      owner = _owner;
      listingRegistry = msg.sender; // ListingRegistry(msg.sender);
      ipfsHash = _ipfsHash;
      price = _price;
      unitsAvailable = _unitsAvailable;
    }

  /*
    * Modifiers
    */

  modifier isSeller() {
    require (msg.sender == owner);
    _;
  }

  /*
    * Public functions
    */


  /// @dev buyListing(): Buy a listing
  /// @param _unitsToBuy Number of units to buy
  function buyListing(uint _unitsToBuy)
    public
    payable
  {
    // Ensure that this is not trying to purchase more than is available.
    require (_unitsToBuy <= unitsAvailable);

    // Create purchase contract
    Purchase purchaseContract = new Purchase(this, msg.sender);

    // Count units as sold
    unitsAvailable -= _unitsToBuy;

    purchases.push(purchaseContract);

    //TODO: How to call function *AND* transfer value??
    purchaseContract.pay.value(msg.value)();

    ListingPurchased(purchaseContract);
  }

  /// @dev close(): Allows a seller to close the listing from further purchases
  function close()
    public
    isSeller
  {
    unitsAvailable = 0;
  }

  /// @dev purchasesLength(): Return number of listings
  function purchasesLength()
    public
    constant
    returns (uint)
  {
      return purchases.length;
  }

  /// @dev getPurchase(): Return listing info for given listing
  /// @param _index the index of the listing we want info about
  function getPurchase(uint _index)
    public
    constant
    returns (Purchase)
  {
    return (
      purchases[_index]
    );
  }

}