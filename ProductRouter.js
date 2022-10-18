import { Router } from 'express'
//import { ContainerMemory } from '../containers/ContainerMemory.js';
import { ProductApi } from '../api/ProductApi.js';
const productRouter = Router();

//const ProductMemory = new ContainerMemory()


productRouter.get('/', (req, res) => {
    const products = ProductApi.getAll()
    res.send({ success: true, data: products })
})


productRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const product = ProductApi.getById(Number(id))
    if (!product) {
        return res.send({ success: false, data: undefined, message: "product not found" })
    }

    res.send({ success: true, data: product })
})


productRouter.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body

    //console.log({ title, price, thumbnail })

    const product = ProductApi.save({ title, price, thumbnail })

    res.send({ success: true, data: { id: product.id } })

})

productRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    const updatedProduct = ProductApi.updateById(id, { title, price, thumbnail })

    res.send({ success: true, data: { updated: updatedProduct } })

})



export { productRouter }