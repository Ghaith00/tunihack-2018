pragma solidity ^0.4.24;


contract Enigma {

    mapping(uint => mapping(string => bytes32)) private data;

    function addInput(uint _year, string _municipality, bytes32 _hash) public returns(bool success) {
        data[_year][_municipality] = _hash;
        return true;
    }
    
    function get(uint _year, string _municipality) public view returns (bytes32) {
        return data[_year][_municipality];
    }
}