const crypto = require("crypto");

const products = [
  {
    id: "45d4c0e8-3e5a-4a40-97aa-58a222a63943",
    name: "Labtop",
    price: "400.00",
    quantity: 4,
    active: true,
  },
  {
    id: "45d4c0e8-3e5a-4a40-97aa-58a222a63944",
    name: "Keyboard",
    price: "29.99",
    quantity: 10,
    active: true,
  },
  {
    id: "45d4c0e8-3e5a-4a40-97aa-58a222a63948",
    name: "Computer",
    price: 700,
    quantity: 1,
    active: true,
  },
];

exports.getAllProducts = (request, response) => {
  response.status(200).json(products);
};

exports.createProduct = (request, response) => {
  const { name, price, quantity, active } = request.body;

  if (!name) {
    return response.status(422).json({ message: "Name is required" });
  }

  const id = crypto.randomUUID();

  products.push({
    id: id,
    name: name,
    price: price,
    quantity: quantity,
    active: active,
  });

  response.status(201).json({
    message: "Product created successfully",
    id: id,
  });
};

exports.getProductById = (request, response) => {
  const product = products.find((product) => product.id === request.params.id);

  if (!product) {
    //return response.status(204).send("Test");
    return response.status(404).json({ message: "Product not found" });
  }

  response.status(200).json(product);
};

exports.updateProduct = (request, response) => {
  const product = products.find((product) => product.id === request.params.id);
  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  const { name, price, quantity, active } = request.body;

  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = price;
  }
  if (quantity) {
    product.quantity = quantity;
  }
  if ("active" in request.body) {
    product.active = active;
  }

  response.status(200).json({
    message: "Product updated successfully",
  });
};

exports.deleteProduct = (request, response) => {
  const productIndex = products.findIndex(
    (product) => product.id === request.params.id
  );

  if (productIndex === -1) {
    return response.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);

  response.status(200).json({
    message: "Product deleted successfully",
  });
};
