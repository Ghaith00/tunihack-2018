pragma solidity ^0.4.24;


contract Enigma {

    mapping(string =>  string) private data;
    mapping(string => mapping(string => string)) private feedback;

    function addInput(string _municipality, string _hash) public returns(bool success) {
        data[_municipality] = _hash;
        return true;
    }
    
    function get(string _municipality) public view returns (string) {
        return data[_municipality];
    }
    
    function addFeedback(string _municipality, string _cin, string _desc) public returns (bool) {
        feedback[_municipality][_cin] = _desc;
        return true;
    }
    
    function getFeedback(string _municipality, string _cin) public view returns (string) {
        return feedback[_municipality][_cin];
    }
}