from flask import Blueprint, jsonify, request
from app.models import Product, ProductImage, db

products_bp = Blueprint('products', __name__, url_prefix='/products')

@products_bp.route('', methods=['POST'])
def create_product():
    data = request.get_json()
    print(data)

    if not all(field in data for field in ['owner_id', 'name', 'category', 'description', 'price', 'quantity']):
        return jsonify({"message": "Missing required fields"}), 400

    new_product = Product(
        owner_id=data['owner_id'],
        name=data['name'],
        category=data['category'],
        description=data['description'],
        price=data['price'],
        quantity=data['quantity']
    )
    
    
    try:
        db.session.add(new_product)
        db.session.commit()
        return jsonify({new_product}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error creating product", "error": str(e)}), 500

@products_bp.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id": p.id, 
        "owner_id": p.owner_id,
        "name": p.name, 
        "category": p.category, 
        "price": p.price, 
        "quantity": p.quantity,
        # "imageUrl": (ProductImage.query.filter_by(product_id=p.id).first()).url
    } for p in products])

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    imageUrl = ProductImage.query.filter_by(product_id=id).first()
    if product:
        return jsonify({
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "description": product.description,
            "price": product.price,
            "quantity": product.quantity,
            "imageUrl": imageUrl.url
        })
    return jsonify({"message": "Product not found"}), 404

@products_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()

    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    product.name = data.get('name', product.name)
    product.owner_id = data.get('owner_id', product.owner_id)
    product.category = data.get('category', product.category)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.quantity = data.get('quantity', product.quantity)
    product.imageUrl = data.get("imageUrl", product.imageUrl)
    
    try:
        db.session.commit()
        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating product", "error": str(e)}), 500

@products_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):

    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting product", "error": str(e)}), 500