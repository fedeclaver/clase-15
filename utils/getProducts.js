const faker = require('faker')

faker.locale = 'es'

const getProducts = () => {
    return {
    
        
        nombre: faker.commerce.productName(),     
        precio: faker.commerce.price(),      
        foto:  faker.image.image()
    }
}

module.exports = getProducts


