const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//get tags by ID 
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }]
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that ID!' });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//post tag functionality
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//put/update tag functionality
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with that ID!' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//delete tag functionality
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that ID!' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
