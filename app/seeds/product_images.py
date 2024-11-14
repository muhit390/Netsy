from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other productImages here if you want
def seed_product_images():
    imageOne = ProductImage(
        productId='1', url='demo@aa.io')
    imageTwo = ProductImage(
        productId='2', url='marnie@aa.io')
    imageThree = ProductImage(
        productId='3', url='bobbie@aa.io')

    db.session.add(imageOne)
    db.session.add(imageTwo)
    db.session.add(imageThree)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the productImages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productImages"))
        
    db.session.commit()