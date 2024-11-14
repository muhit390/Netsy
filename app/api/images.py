from flask import Blueprint, jsonify, request, render_template, redirect
from ..models import ProductImage
from app.models import db
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from aws_helpers import ALLOWED_EXTENSIONS, upload_file_to_s3, get_unique_filename
from app.models import db, Image
from flask_login import current_user, login_required

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")


images_bp = Blueprint('images', __name__)

@images_bp.route('/products/<int:product_id>/images', methods=['POST'])
@login_required
def add_product_image(product_id):
    data = ImageForm()
    data["csrf_token"].data = request.cookies["csrf_token"]

    if data.validate_on_submit():
          
        image = data.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)D
            return render_template("post_form.html", form=data, errors=[upload])
        
        url = upload["url"]
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if not data.get('name'):
        return jsonify({"message": "Image name is required"}), 400
    
    if data.errors:
        print(data.errors)
        return render_template("post_form.html", form=data, errors=data.errors)

    new_image = ProductImage(
        product_id=product_id,
        name=data['name'],
        preview_image=data.get('preview_image', False)
    )
    
    return jsonify([
        {
            "id": new_image.id,
            "productId": new_image.productId,
            "name": new_image.name,
            "previewImage": new_image.previewImage
        }
    ])
    

@images_bp.route('/products/<int:product_id>/images', methods=['GET'])
def get_product_images(product_id):
    images = ProductImage.query.filter_by(product_id=product_id).all()
    
    if not images:
        return jsonify({"message": "No images found for this product"}), 404
    
    return jsonify([{
        "id": img.id,
        "name": img.name,
        "preview_image": img.preview_image
    } for img in images])

@images_bp.route('/products/<int:product_id>/images/<int:image_id>', methods=['PUT'])
def update_product_image(product_id, image_id):
    data = request.get_json()

    image = ProductImage.query.filter_by(id=image_id, product_id=product_id).first()
    
    if not image:
        return jsonify({"message": "Image not found"}), 404

    image.name = data.get('name', image.name)
    image.preview_image = data.get('preview_image', image.preview_image)
    
    try:
        db.session.commit()
        return jsonify({"message": "Image updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating image", "error": str(e)}), 500

@images_bp.route('/products/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
def delete_product_image(product_id, image_id):
    image = ProductImage.query.filter_by(id=image_id, product_id=product_id).first()
    
    if not image:
        return jsonify({"message": "Image not found"}), 404

    try:
        db.session.delete(image)
        db.session.commit()
        return jsonify({"message": "Image deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting image", "error": str(e)}), 500