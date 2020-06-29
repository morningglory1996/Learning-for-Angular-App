'use strict';
const Product = require('./model/product');

class SampleDb {
  constructor() {
    this.products = [
      {
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingText1: 'ああああああああああああああああああああああああああああああああ',
        headingText2: 'ああああああああああああああああああああああああああああああああ',
        headingText3: 'ああああああああああああああああああああああああああああああああ',
        coverImage: '/assets/img/phone-cover.jpg'
      },
      {
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingText1: 'ああああああああああああああああああああああああああああああああ',
        headingText2: 'ああああああああああああああああああああああああああああああああ',
        headingText3: 'ああああああああああああああああああああああああああああああああ',
        coverImage: '/assets/img/phone-cover.jpg'
      },
      {
        name: 'Phone Standard',
        price: 299,
        description: '',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingText1: 'ああああああああああああああああああああああああああああああああ',
        headingText2: 'ああああああああああああああああああああああああああああああああ',
        headingText3: 'ああああああああああああああああああああああああああああああああ',
        coverImage: '/assets/img/phone-cover.jpg'
      },
      {
          name: 'Phone Specail',
          price: 1000,
          description: '',
          heading1: 'サンプルテキスト1',
          heading2: 'サンプルテキスト2',
          heading3: 'サンプルテキスト3',
          headingText1: 'ああああああああああああああああああああああああああああああああ',
          headingText2: 'ああああああああああああああああああああああああああああああああ',
          headingText3: 'ああああああああああああああああああああああああああああああああ',
          coverImage: '/assets/img/phone-cover.jpg'
        }
      ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushProductsTodb();
  }

  async cleanDb() {
    await Product.deleteMany({});
  }

  pushProductsTodb() {
    this.products.forEach((product) => {
      const newProduct = new Product(product);
      newProduct.save();
    })
  }

}

module.exports = SampleDb;