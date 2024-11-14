from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey('products.id'), primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    #relations
    user = db.relationship('User', back_populates='reviews')
    product = db.relationship('Product', back_populates='reviews')

    def to_dict_basic(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "updatedAt": self.updated_at
        }
    
    def to_dict(self):
        return {
            **self.to_dict_basic(),
            "User": self.user.to_dict_basic(),
            "images": [image.to_dict() for image in self.product_images]
        }