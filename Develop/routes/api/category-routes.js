const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint


// GET all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


// GET a single category by its `id` and its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product]
    });


    if (!category) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }


    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});


// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});


// PUT (update) a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });


    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }


    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});


// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });


    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }


    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
