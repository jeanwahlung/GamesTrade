import React, { Component } from 'react';
import Web3 from 'web3'
import { getFromStorage, setInStorage } from './utils/storage';
import './App.css';
import swal from 'sweetalert';
import Marketplace from '../abis/Marketplace.json'
import Navbar2 from './Navbar'
import Main from './Main'
import axios from 'axios'

class Market extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()// Verify token
    axios.get('http://localhost:4000/users/api/account')
      .then(response => {
        this.setState({ users: response.data });


      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:4000/users/api/account/trades/')
      .then(response => {
        this.setState({ trades: response.data });
        this.state.trades.map(trade => {



          this.props.myproductstrade.map(user => {

            if (trade.userId2 == user.id) {

              this.state.mytrades.push(trade)

            }


          });


        });

      })
      .catch(function (error) {
        console.log(error);
      })


  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        if (product.id > 0 && product.price > 0 && this.state.account != product.owner) {
          this.setState({
            products: [...this.state.products, product]
          })
        } else if (product.id > 0 && product.price == 0 && this.state.account == product.owner) {
          this.setState({
            myproductstrade: [...this.state.myproductstrade, product]
          })
        } else if (product.id > 0 && product.price == 0) {
          this.setState({
            productstrade: [...this.state.productstrade, product]
          })
        }
        if (product.id > 0 && product.price >= 0 && this.state.account == product.owner ) {
          this.setState({
            myproducts: [...this.state.myproducts, product]
          })
        }

      }

      this.setState({ loading: false })


    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      myproducts: [],
      myproductstrade: [],
      productstrade: [],
      loading: true,
      trades: [],
      mytrades: [],
      users: [],
      
    }

    this.createProduct = this.createProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
    this.createTrade = this.createTrade.bind(this)
    this.deleteTrade = this.deleteTrade.bind(this)
    this.updateTrade = this.updateTrade.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.purchaseProducttrade = this.purchaseProducttrade.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('usuarios');

    if (obj && obj.token) {
      const { token } = obj;

      // Verify token
      axios.post('http://localhost:4000/users/api/account/update/' + this.state.token, obj)
        .then(response => {


          this.state.users.map(user => {
            if (token == user._id) {
              this.setState({
                token: '',
                isLoading: false
              });

            } else {
              this.setState({
                isLoading: false,
              });
            }


          });
        })
        .catch(function (error) {
          console.log(error);
        })


    } else {
      this.setState({
        isLoading: false,
      });
    }

  }


  createTrade(userid1, name1, userid2, owner, name2) {

    const newTrade = {
      userId1: userid1,
      name1: name1,
      userId2: userid2,
      owner: owner,
      name2: name2,
      isTraded1: true,
      isTraded2: false
    }




    axios.post('http://localhost:4000/users/api/account/trades/add/', newTrade)
      .then(res => {
        swal("Exito!", "Trade Request Created Succesfully", "success")
      });
  }
  deleteTrade(id) {
    axios.delete('http://localhost:4000/users/api/account/trades/delete/' + id)
      .then(response => {

        let trades = this.state.mytrades;
        let index = -1
        let counter = 0;
        for (let trade of trades) {
          if (trade._id === id) {
            index = counter;
            break
          }
          counter++;
        }

        if (index !== -1) {
          trades.splice(index, 1);
          this.setState({
            mytrades: trades
          });
        }
        swal("Exito!", "Trade Request Refuse Succesfully", "success")
        //this.props.history.push('/todos');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  updateTrade(id, name, description, image, price) {

  }

  createProduct(name, description, image, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, description, image, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        swal("Exito!", "Product Created  Succesfully", "success")
        this.setState({ loading: false })
      })
  }
  deleteProduct(id) {
    this.setState({ loading: true })
    this.state.marketplace.methods.deleteProduct(id).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }
  updateProduct(id, name, description, image, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.updateProduct(id, name, description, image, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })

      })
  }
  purchaseProducttrade(product1, product2, owner) {
    this.setState({ loading: true })

    this.state.marketplace.methods.purchaseTrade(product2, product1).send({ from: this.state.account, value: 0 })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })

      })


  }
  purchaseProducttrade2(product1, product2) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(product1.id).send({ from: product2.owner, value: product1.price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })

      })


  }

  render() {
    return (
      <div>
        <Navbar2 account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  products={this.state.products}
                  myproducts={this.state.myproducts}
                  productstrade={this.state.productstrade}
                  myproductstrade={this.state.myproductstrade}
                  createProduct={this.createProduct}
                  updateProduct={this.updateProduct}
                  deleteProduct={this.deleteProduct}
                  createTrade={this.createTrade}
                  updateTrade={this.updateTrade}
                  deleteTrade={this.deleteTrade}
                  account={this.state.account}
                  purchaseProducttrade={this.purchaseProducttrade}
                  purchaseProduct={this.purchaseProduct}
                  logout={this.logout}
                  cargar={this.cargar}
                  mytrades={this.state.mytrades}
                  url={this.state.image}
                />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Market;