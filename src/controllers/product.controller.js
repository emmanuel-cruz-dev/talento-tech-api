import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json({ status: "OK", payload: products });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      payload: { error: error?.message || error },
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      status: "FAILED",
      payload: {
        error: "Se requiere el ID del producto",
      },
    });
  }

  try {
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).send({
        status: "FAILED",
        payload: { error: `Producto con ID ${id} no encontrado` },
      });
    }

    res.send({ status: "OK", payload: product });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      payload: { error: error?.message || "Error al obtener el producto" },
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      payload: { error: "Se requiere el ID del producto" },
    });
  }

  try {
    const result = await productService.deleteProduct(id);

    res.status(200).send({
      status: "OK",
      payload: result.data,
      message: result.message,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || "Error al eliminar el producto" },
      });
  }
};

export default { getAllProducts, getProductById, createProduct, deleteProduct };
