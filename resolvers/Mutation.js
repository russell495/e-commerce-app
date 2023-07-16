const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, image, price, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      image,
      price,
      onSale,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    // Filter out the category with the given id from the categories array
    db.categories = db.categories.filter((category) => category.id !== id);

    // Update the categoryId of products associated with the deleted category
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null,
        };
      } else {
        return product;
      }
    });

    return true;
  },

  deleteProduct: (parent, { id }, { db }) => {
    // Filter out the product with the given id from the products array
    db.products = db.products.filter((product) => product.id !== id);

    // Remove the reviews associated with the deleted product
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    // Filter out the product with the given id from the products array
    db.reviews = db.reviews.filter((review) => review.id !== id);

    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      return null;
    }
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return null;
    }
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) {
      return null;
    }
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return db.reviews[index];
  },
};
