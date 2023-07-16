exports.Category = {
  products: ({ id: categoryId }, { filter }, {  db }) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === categoryId
    );
    let filterCaregoryProducts = categoryProducts;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filterCaregoryProducts = filterCaregoryProducts.filter((product) => {
          return product.onSale;
        });
      } else if (onSale === false) {
        filterCaregoryProducts = filterCaregoryProducts.filter((product) => {
          return !product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterCaregoryProducts = filterCaregoryProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
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
    return filterCaregoryProducts;
  },
};
