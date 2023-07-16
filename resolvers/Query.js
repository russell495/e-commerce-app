exports.Query = {
  hello: () => {
    return ["Hello !", " My first", "schema"];
  },
  products: (parent, { filter }, { db }) => {
    let filterProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== undefined) {
        filterProducts = filterProducts.filter((product) => {
          if (onSale) {
            return product.onSale;
          } else {
            return !product.onSale;
          }
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterProducts = filterProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating =
            numberOfReviews > 0 ? sumRating / numberOfReviews : 0;
          return avgProductRating >= avgRating;
        });
      }
    }
    return filterProducts;
  },

  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === arg.id);
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
