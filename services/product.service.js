const faker = require('faker')
const boom = require("@hapi/boom")

class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100
    for (let index = 0; index < limit ; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image : faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }
  find(){
    return new Promise((resolve, )=> {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    })
    //return this.products;
  }
  async findOne(id){
    const product =  this.products.find(e => e.id === id)
    if(!product){
      throw boom.notFound('Product not found')
    }
    if(product.isBlock){
      throw boom.conflict('product is blocked')
    }
    return product
  }
  async update(id, data){
    const index= this.products.findIndex(prod => prod.id === id)
    if(index<0){
      throw boom.notFound('Product not found')
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...data,
    }
    return this.products[index]
  }
  async delete(id){
    const index = this.products.findIndex(prod => prod.id === id)
    if(index<0){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1)
    return {id}
  }

}

module.exports= ProductsService
