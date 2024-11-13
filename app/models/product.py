from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text)
    description = db.Column(db.Text)
    price = db.Column(db.BigInteger, nullable=False)
    quantity = db.Column(db.BigInteger, nullable=False)

    owner = db.relationship('User', back_populates='product')
    reviews = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')
    product_images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')
    shopping_cart = db.relationship('ShoppingCart', back_populates='product', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='product', cascade='all, delete-orphan')
