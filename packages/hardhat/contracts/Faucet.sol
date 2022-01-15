// SPDX-License-Identifier: UNLICENSED

/**
  /$$$$$$            /$$           /$$      /$$                                        
 /$$__  $$          | $$          | $$$    /$$$                                        
| $$  \ $$ /$$$$$$$ | $$ /$$   /$$| $$$$  /$$$$  /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$
| $$  | $$| $$__  $$| $$| $$  | $$| $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$__  $$ /$$_____/
| $$  | $$| $$  \ $$| $$| $$  | $$| $$  $$$| $$| $$  \ $$| $$  \ $$| $$  \ $$|  $$$$$$ 
| $$  | $$| $$  | $$| $$| $$  | $$| $$\  $ | $$| $$  | $$| $$  | $$| $$  | $$ \____  $$
|  $$$$$$/| $$  | $$| $$|  $$$$$$$| $$ \/  | $$|  $$$$$$/|  $$$$$$/| $$  | $$ /$$$$$$$/
 \______/ |__/  |__/|__/ \____  $$|__/     |__/ \______/  \______/ |__/  |__/|_______/ 
                         /$$  | $$                                                     
                        |  $$$$$$/                                                     
                         \______/                                                      

  https://onlymoons.io/
*/

pragma solidity ^0.8.0;

import { Ownable } from "./Ownable.sol";
import { ReentrancyGuard } from "./library/ReentrancyGuard.sol";
import { IERC20 } from "./library/IERC20.sol";
import { SafeERC20 } from "./library/SafeERC20.sol";

contract Faucet is Ownable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  /**
   * @param tokenAddress - address of ERC20 token to disperse
   * @param claimAmount - amount of tokens to claim at a time
   * @param claimCooldown - amount of seconds that must pass before allowing the same account to claim again
   */
  constructor(address tokenAddress, uint256 claimAmount, uint256 claimCooldown) Ownable(_msgSender()) {
    //
    _token = IERC20(tokenAddress);
    _claimAmount = claimAmount;
    _claimCooldown = claimCooldown;
  }

  IERC20 internal immutable _token;

  uint256 internal _claimAmount;
  uint256 internal _claimCooldown;

  /** @dev account => time */
  mapping(address => uint256) internal _claims;

  function _balance() internal view returns (uint256) {
    return _token.balanceOf(address(this));
  }

  function balance() external view returns (uint256) {
    return _balance();
  }

  function getClaimLimits() external view returns (uint256 amount, uint256 cooldown) {
    amount = _claimAmount;
    cooldown = _claimCooldown;
  }

  function setClaimLimits(uint256 amount, uint256 cooldown) external onlyOwner {
    _claimAmount = amount;
    _claimCooldown = cooldown;
  }

  function _claim(address account) internal virtual {
    require(block.timestamp - _claims[account] >= _claimCooldown, "Account is on cooldown");

    _claims[account] = block.timestamp;
    _token.safeTransfer(account, _claimAmount);
  }

  function claim() external nonReentrant {
    _claim(_msgSender());
  }

  function removeTokens() external onlyOwner nonReentrant {
    _token.safeTransfer(_owner(), _balance());
  }
}
