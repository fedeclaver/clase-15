const faker = require('faker')

faker.locale = 'es'

const getProducts = () => {
    return {
    

        nombre: faker.commerce.productName(),       
        precio: faker.internet.email(),       
        foto: faker.image.avatar()
    }
}

module.exports = getProducts


