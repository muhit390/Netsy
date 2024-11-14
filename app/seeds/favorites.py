from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(
        user_id=1, product_id=3)
    favorite2 = Favorite(
        user_id=2, product_id=1)
    favorite3 = Favorite(
        user_id=3, product_id=2)

    db.session.add_all([favorite1, favorite2, favorite3])
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
    db.session.commit()