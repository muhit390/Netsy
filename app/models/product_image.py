# models/product_image.py
from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey('products.id'), nullable=False)
    url = db.Column(db.String, default=False)

    product = db.relationship("Product", back_populates="product_image")

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "productId": self.product_id
        }

