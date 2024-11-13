from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        product_id=1, user_id=2, review='Amazing product, very satisfied!', rating=5)
    review2 = Review(
        product_id=2, user_id=3, review='Works well, but had some issues.', rating=3)
    review3 = Review(
        product_id=3, user_id=1, review='Enjoyed this book a lot, recommended!', rating=4)

    db.session.add_all([review1, review2, review3])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()