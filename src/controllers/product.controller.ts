import type { Request, Response } from "express";
import productService from "../services/product.service";
import type {
  Product,
  PaginationOptions,
  ProductQueryParams,
  PaginatedResult,
  CreateProductData,
} from "../types/index";

const getAllProducts = async (
  req: Request<{}, {}, {}, ProductQueryParams>,
  res: Response
): Promise<void> => {
  try {
    const {
      limit = "10",
      page = "1",
      sortBy = "createdAt",
      order = "desc",
      search,
      category,
      minPrice,
      maxPrice,
      brand,
      isActive,
      minRating,
      startAfter,
    } = req.query;

    const parsedLimit = Math.min(parseInt(limit) || 10, 100);
    const parsedPage = parseInt(page) || 1;

    const options: PaginationOptions = {
      limit: parsedLimit,
      page: parsedPage,
      sortBy,
      order: order.toLowerCase(),
      filters: {},
    };

    if (search) options.filters.search = search;
    if (category) options.filters.category = category;
    if (brand) options.filters.brand = brand;
    if (minPrice) options.filters.minPrice = parseFloat(minPrice);
    if (maxPrice) options.filters.maxPrice = parseFloat(maxPrice);
    if (minRating) options.filters.minRating = parseFloat(minRating);
    if (isActive !== undefined) options.filters.isActive = isActive === "true";
    if (startAfter) options.startAfter = startAfter;

    const result: PaginatedResult = await productService.getAllWithPagination(
      options
    );

    res.status(200).json({
      message: "Lista de productos",
      payload: result.products,
      pagination: {
        total: result.total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(result.total / parsedLimit),
        hasNext: result.hasNext,
        hasPrev: parsedPage > 1,
        nextCursor: result.nextCursor,
      },
    });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      message: "Error al obtener los productos",
      payload: { error: error?.message || "Error interno del servidor" },
    });
  }
};

const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response | void> => {
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
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      payload: { error: error?.message || "Error al obtener el producto" },
    });
  }
};

const createProduct = async (
  req: Request<{}, {}, Partial<Product>>,
  res: Response
): Promise<Response | void> => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      stock,
      rating,
      brand,
      isActive,
    } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({
        error: "Faltan campos requeridos: name, price, category",
      });
    }

    const newProduct: CreateProductData = {
      name,
      description: description || "",
      price: +price,
      image: image || "",
      category,
      stock: stock !== undefined ? +stock : 0,
      rating: rating !== undefined ? +rating : 0,
      brand: brand || "Sin marca",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdAt: new Date().toISOString(),
    };

    await productService.createProduct(newProduct);

    res.status(201).json({
      message: "Producto creado exitosamente",
      payload: newProduct,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Se requiere el ID del producto",
      payload: { error: "ID no proporcionado" },
    });
    return;
  }

  try {
    const result: { message: string; data?: any } =
      await productService.deleteProduct(id);

    res.status(200).json({
      message: result.message,
      payload: result.data || null,
    });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      message: "Error al eliminar el producto",
      payload: { error: error?.message || "Error interno del servidor" },
    });
  }
};

const createManyProducts = async (
  req: Request<{}, {}, Partial<Product>[]>,
  res: Response
): Promise<Response | void> => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe enviar un array de productos" });
    }

    const validProducts: CreateProductData[] = [];
    const invalidProducts: Partial<Product>[] = [];

    for (const item of products) {
      const { name, price, category } = item;

      if (!name || price === undefined || !category) {
        invalidProducts.push(item);
        continue;
      }

      validProducts.push({
        name,
        description: item.description || "",
        price: item.price !== undefined ? +item.price : 0,
        image: item.image || "",
        category,
        stock: item.stock !== undefined ? +item.stock : 0,
        rating: item.rating !== undefined ? +item.rating : 0,
        brand: item.brand || "Sin marca",
        isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
        createdAt: new Date().toISOString(),
      });
    }

    if (validProducts.length === 0) {
      return res.status(400).json({
        error: "Ningún producto válido para crear",
        invalidProducts,
      });
    }

    const result: { message: string } = await productService.createManyProducts(
      validProducts
    );

    res.status(201).json({
      message: "Productos creados exitosamente",
      createdCount: validProducts.length,
      invalidCount: invalidProducts.length,
      payload: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear productos masivamente",
      payload: { error: error?.message || "Error interno del servidor" },
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  createManyProducts,
};
