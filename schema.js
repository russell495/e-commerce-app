const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: [String!]
    products(filter: ProductFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: addCategoryInput): Category
    addProduct(input: createProducInput): Product
    addReview(input: addReviewInput): Review
    deleteCategory(id: ID!): Boolean
    deleteProduct(id: ID!): Boolean
    deleteReview(id: ID!): Boolean
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    updateProduct(id: ID!, input: updateProducInput!): Product
    updateReview(id: ID!, input: updateReviewInput!): Review
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }
  type Category {
    id: ID!
    name: String!
    products(filter: ProductFilterInput): [Product!]!
  }
  type Review {
    id: ID!
    date: String
    title: String
    comment: String!
    rating: Int!
    productId: ID!
  }
  input ProductFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input addCategoryInput {
    name: String!
  }

  input updateCategoryInput {
    name: String!
  }

  input addReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int
    productId: ID!
  }

  input updateReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int
    productId: ID!
  }

  input createProducInput {
    name: String!
    description: String!
    quantity: Int!
    image: String
    price: Float!
    onSale: Boolean!
    categoryId: String
  }

  input updateProducInput {
    name: String!
    description: String!
    quantity: Int!
    image: String
    price: Float!
    onSale: Boolean!
    categoryId: String
  }
`;
