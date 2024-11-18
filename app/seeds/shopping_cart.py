from app.models import db, ShoppingCart, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_cart():
    # Dynamically fetch products
    product1 = Product.query.filter_by(name="Product 1").first()
    product2 = Product.query.filter_by(name="Product 2").first()
    product3 = Product.query.filter_by(name="Product 3").first()

    # Ensure products exist before referencing
    if not all([product1, product2, product3]):
        print("Error: One or more products not found in the database!")
        return

    # Seed shopping cart
    cart_item1 = ShoppingCart(user_id=1, product_id=product2.id)
    cart_item2 = ShoppingCart(user_id=2, product_id=product1.id)
    cart_item3 = ShoppingCart(user_id=3, product_id=product3.id)

    db.session.add_all([cart_item1, cart_item2, cart_item3])
    db.session.commit()

def undo_shopping_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart"))
    db.session.commit()