from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other productImages here if you want
def seed_product_images():
    imageOne = ProductImage(
        product_id='1', url='https://westcoastvapesupply.com/cdn/shop/files/GeekBarSkyviewSourAppleIce.jpg?v=1717112784&width=500')
    imageTwo = ProductImage(
        product_id='2', url='https://i.ebayimg.com/images/g/E38AAOSwwKdl-oN4/s-l1200.jpg')
    imageThree = ProductImage(
        product_id='3', url='https://m.media-amazon.com/images/I/91vwDVfhnSL.jpg')

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