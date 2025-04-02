import Product from '../models/product.js';

const getAllProducts = async (req, res) => {
    const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;

    try {
        const products = await Product.find({ name: new RegExp(query, 'i') })
            .sort({ price: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const totalProducts = await Product.countDocuments({ name: new RegExp(query, 'i') });

        res.json({
            status: 'success',
            payload: products,
            totalPages: Math.ceil(totalProducts / limit),
            prevPage: page > 1 ? parseInt(page) - 1 : null,
            nextPage: page * limit < totalProducts ? parseInt(page) + 1 : null,
            page: parseInt(page),
            hasPrevPage: page > 1,
            hasNextPage: page * limit < totalProducts,
            prevLink: page > 1 ? `/products?page=${parseInt(page) - 1}` : null,
            nextLink: page * limit < totalProducts ? `/products?page=${parseInt(page) + 1}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, price, category, availability } = req.body;
    try {
        const newProduct = new Product({ name, price, category, availability });
        await newProduct.save();
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category, availability } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, category, availability }, { new: true });
        if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
