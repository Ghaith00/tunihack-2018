# Tunihack, Open municipalities data application verified with the Ethereum Blockchain

This plateform, makes use of the data provided by opengov sources to extract and visualise usefull and simple informations to the normal citizen. It guarantees also the integrity and immutability of the data by verifing it on the blockchain. Also, it gives the user the possibility to interact with institutions by givin his feedback according to informations and statistics.

## Installation:

* `git clone https://github.com/Ghaith00/tunihack-2018`
* `cd Tunihack-Hackathon`

## Ethereum installation:

* Installation of [geth the Ethereum client](https://www.ethereum.org/cli)

## Getting the chain ready

* Execution of bootstrap-node shell script `./chain/bootstrap-node`


## Dependencies of the Node JS web application

* `cd backend`
* `npm install`
* `npm start`

### API routes
  GET '/'                         => just for testing if api is accessible
  GET '/metadata'                 => get municipalities of each governorate
  GET '/governorates              => all governorates
  GET '/governorates/:g_name      => governorate by name
  GET '/governorates/:g_name/municipalities           => municipalities by governorate
  GET '/governorates/:g_name/municipalities/:m_name'  => municipality by governorate by name
  GET '/projects/governorates/:g_name/municipalities/:m_name'  => municipality projects by governorate by name


## React front end app

* install http server `npm install`
* `cd ui`
* `npm start`
