pragma solidity ^0.4.24;


contract Enigma {

    mapping(string =>  string) private data;

    function addInput(string _municipality, string _hash) public returns(bool success) {
        data[_municipality] = _hash;
        return true;
    }
    
    function get(string _municipality) public view returns (string) {
        return data[_municipality];
    }
}