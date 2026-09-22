import prisma from "../database/prismaClient.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema.js";

export const createProduct = async (req, res, next) => {
  try {
    const validation = createProductSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Ungültige Eingaben",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const { name, price, stock, categoryId } = validation.data;

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        message: "Kategorie nicht gefunden",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Ungültige Produkt-ID",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Produkt nicht gefunden",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Ungültige Produkt-ID",
      });
    }

    const validation = updateProductSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Ungültige Eingaben",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Produkt nicht gefunden",
      });
    }

    if (validation.data.categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: { id: validation.data.categoryId },
      });

      if (!category) {
        return res.status(404).json({
          message: "Kategorie nicht gefunden",
        });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: validation.data,
      include: {
        category: true,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
