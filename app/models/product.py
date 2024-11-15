from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

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
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    user = db.relationship('User', back_populates='product')
    reviews = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')
    product_image = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')
    shopping_cart = db.relationship('ShoppingCart', back_populates='product', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='product', cascade='all, delete-orphan')

    def to_dict_basic(self):
        return {
            "id": self.id,
            "owner_id": self.user_id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "price": self.price,
            "quantity": self.quantity,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
    
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "User": self.user.to_dict_basic(),
            "images": [image.to_dict() for image in self.product_images],
            "reviews": [review.to_dict_basic() for review in self.reviews]
        }