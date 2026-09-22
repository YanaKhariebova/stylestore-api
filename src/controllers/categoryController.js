import prisma from "../database/prismaClient.js";

export const createCategory = async (req, res, next) => {
  try {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    if (!name) {
      return res.status(400).json({
        message: "Name ist erforderlich",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Kategorie existiert bereits",
      });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryProducts = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Ungültige Kategorie-ID",
      });
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Kategorie nicht gefunden",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
