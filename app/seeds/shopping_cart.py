from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_cart():
    cart_item1 = ShoppingCart(
        user_id=1, product_id=2)
    cart_item2 = ShoppingCart(
        user_id=2, product_id=1)
    cart_item3 = ShoppingCart(
        user_id=3, product_id=3)

    db.session.add_all([cart_item1, cart_item2, cart_item3])
    db.session.commit()

def undo_shopping_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart"))
    db.session.commit()