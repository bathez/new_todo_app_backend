import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Kingsley',
        username: 'sleez',
        lastName: 'Henry',
        password: '12345',
        email: 'kingsley@gmail.com',
        isEmailVerified: false,
      },
      {
        firstName: 'Tochukwu',
        username: 'tochy',
        lastName: 'Okoro',
        password: '12345',
        email: 'tochi@gmail.com',
        isEmailVerified: true,
      },
      {
        firstName: 'mazi',
        username: 'mazinwa',
        lastName: 'Henry',
        password: '12345',
        email: 'mazi@gmail.com',
        isEmailVerified: false,
      },
    ],
  });
}

async function seedProduct() {
  const products = await prisma.product.createMany({
    data: [
      {
        "title": "onyeka laptop bag Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        "title": "onyeka laptop bag Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        "title": "onyeka laptop bag Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        "title": "onyeka laptop bag Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        "title": "onyeka laptop bag Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      }
    ],
  });

  const reviews = await prisma.rating.createMany({
    data: [
      {
        productId: 1,
        rate: 3,
        count: 30,
      },
      {
        productId: 2,
        rate: 5,
        count: 11,
      },
      {
        productId: 3,
        rate: 6,
        count: 3,
      },
      {
        productId: 4,
        rate: 2,
        count: 32,
      },
      {
        productId: 5,
        rate: 9,
        count: 20,
      },
    ],
  });
}

main();
seedProduct();
