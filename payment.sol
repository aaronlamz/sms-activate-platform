pragma solidity ^0.5.8;

interface ITRC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract Payment {
    address public usdt = address(0x41a614f803b6fd780986a42c78ec9c7f77e6ded13c); // TRC20 USDT 主网合约地址（hex）
    address public merchant = address(0x41eEA74467E8181F3A81A94daD88323d38D481d8); // 👈 你的钱包地址 hex 格式（已转换）

    function pay(uint256 amount) public {
        require(ITRC20(usdt).transferFrom(msg.sender, merchant, amount), "Transfer failed");
    }
}