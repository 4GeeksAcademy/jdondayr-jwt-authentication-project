"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
### JWT imports
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

########## Endpoints
# Get all users
@api.route("/users")
def get_all_users():
    all_users = db.session.scalars(select(User)).all()
    all_users_dicts = map(lambda user: user.serialize(), all_users)
    return jsonify(list(all_users_dicts))

# Register an user
@api.route("/users", methods=["POST"])
def register_user():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify({"msg": "Email or password is missing"}), 400
    existing_user = db.session.scalar(select(User).where(User.email == email))
    if existing_user:
        return jsonify({"msg": "An account is alredy associated to email"}), 401
    new_user = User(
        email=email,
        password=password,
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "msg": "User created successfully",
        "user": new_user.serialize()
    })

# Delete user
@api.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user_to_delete = db.session.scalar(select(User).where(User.id == user_id))
    if not user_to_delete:
        return jsonify({"msg": "User not found"}), 404
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({
        "msg": "User deleted successfully",
        "deleted_user": user_to_delete.serialize()
    })

@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify({"msg": "email or password is missing"}), 400
    user = db.session.scalar(select(User).where(
        User.email == email,
        User.password == password
    ))
    if not user:
        return jsonify({"msg": "Invalid email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/users/me", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = db.session.scalar(select(User).where(User.email == current_user_email))
    return jsonify({
        "msg": "This is your private profile",
        "user": user.serialize()
    })

