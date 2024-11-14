# models/product_image.py
from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey('products.id'), nullable=False)
    name = db.Column(db.String(255))
    preview_image = db.Column(db.Boolean, default=False)
