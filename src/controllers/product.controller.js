import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json({ message: "Lista de productos", payload: products });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: "Error al obtener los productos",
      payload: { error: error?.message || "Error interno del servidor" },
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "FAILED",
      payload: {
        error: "Se requiere el ID del producto",
      },
    });
  }

  try {
    const product = await productService.getProductById(id);

    if (!product) {
      return res
        .status(404)
        .json({ error: `Producto con ID '${id}' no encontrado` });
    }

    res.json({ status: "OK", payload: product });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      payload: { error: error?.message || "Error al obtener el producto" },
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, precio, categoria, disponible } = req.body;

    // Validate data
    if (!nombre || !precio || !categoria) {
      return res.status(400).json({
        error: "Faltan campos requeridos: nombre, precio, categoria",
      });
    }

    const newProduct = {
      nombre,
      precio: +precio,
      categoria,
      disponible: disponible || false,
    };

    await productService.createProduct(newProduct);
    res
      .status(201)
      .json({ message: "Lista de productos", payload: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Se requiere el ID del producto",
      payload: { error: "ID no proporcionado" },
    });
  }

  try {
    const result = await productService.deleteProduct(id);

    res.status(200).json({
      message: result.message,
      payload: result.data || null,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: "Error al eliminar el producto",
      payload: { error: error?.message || "Error interno del servidor" },
    });
  }
};

export default { getAllProducts, getProductById, createProduct, deleteProduct };
