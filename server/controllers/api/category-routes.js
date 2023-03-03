const router = require("express").Router();
const { Category } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all categories
router.get("/", withAuth, async (req, res) => {
	const categories = await Category.findAll();
	res.json(categories);
});

// GET a single category by ID
router.get("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByPk(id);
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}
	res.json(category);
});

// CREATE a new category
router.post("/", withAuth, async (req, res) => {
	const { name } = req.body;
	const category = await Category.create({ name });
	res.json(category);
});

// UPDATE an existing category
router.put("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const category = await Category.findByPk(id);
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}
	category.name = name;
	await category.save();
	res.json(category);
});

// DELETE an existing category
router.delete("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByPk(id);
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}
	await category.destroy();
	res.json({ message: "Category deleted successfully" });
});

module.exports = router;
