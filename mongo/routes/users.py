from flask import Blueprint, session, Response, request
import pymongo
import json
from bson.objectid import ObjectId
import bcrypt

#products = Blueprint("products", __name__)
users= Blueprint("users",__name__)

try :
    mongo = pymongo.MongoClient(
    host = "localhost",
    port = 27017,
    serverSelectionTimeoutMS = 1000
    )
    db = mongo.company
    mongo.server_info ( ) # trigger exception if cannot connect to db
except :
    print ( " ERROR - Cannot connect to db " )
   
#######################################
@users.route ("/register" , methods=["POST"])
def register() :
    try:
        users = db.users
        signup_user = users.find_one({'email': request.form['email']})
        if signup_user:
            return Response(
            response = json.dumps({"message " : request.form['email'] + "email is already exist"}), 
            status = 500 ,
            mimetype = "application/json"
        )
        hashed = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt(14))
        user = { 
            'firstName': request.form['firstName'],
            'lastName': request.form['lastName'],
            'email': request.form['email'], 
            'password': hashed
        }
        dbResponse = db.users.insert_one(user)
        print( dbResponse.inserted_id )
        return Response (
            response = json.dumps(
                {"message " : " User Registred! ",
                "id":f"{dbResponse.inserted_id}"
                },indent=4, sort_keys=True, default=str), 
            status = 200 ,
            mimetype = "application/json"
            )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot create an account"}), 
            status = 500 ,
            mimetype = "application/json"
        )
#######################################
@users.route ("/login" , methods=["POST"])
def login() :
    try:
        users = db.users
        signin_user = users.find_one({'email': request.form['email']})
        if signin_user:
            if bcrypt.hashpw(request.form['password'].encode('utf-8'), signin_user['password']) == signin_user['password']:
                session['email'] = request.form['email']
                return Response(
                response = json.dumps({"message " : request.form['email'] + "you are logged in!"}), 
                status = 200 ,
                mimetype = "application/json"
                )
            return Response(
                response = json.dumps({"message " : "Username and password combination is wrong!"}), 
                status = 500 ,
                mimetype = "application/json"
            )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot login!"}), 
            status = 500 ,
            mimetype = "application/json"
        )
#######################################
@users.route('/logout')
def logout():
    session.pop('email', None)
    return Response(
                response = json.dumps({"message " : "you just logged out!"}), 
                status = 200 ,
                mimetype = "application/json"
    )
#######################################
@users.route ("/<id>" , methods=["DELETE"])
def delete_user (id) :
    try :
        dbResponse = db.users.delete_one({"_id":ObjectId(id)})
        if dbResponse.deleted_count==1:
            return Response(
                response = json.dumps(
                { "message":"user deleted!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
        return Response(
                response = json.dumps(
                { "message":"user not found!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
    except Exception as ex :
        print (ex)
        return Response(
            response = json.dumps({"message " : " sorry cannot Delete user"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@users.route ("/" , methods=["GET"])
def get_users ( ) :
    try:
        data = list(db.users.find())
        for product in data :
            product["_id"]=str(product["_id"])
        return Response(
            response = json.dumps(data,indent=4, sort_keys=True, default=str),
            status = 200 ,
            mimetype = "application/json"
        )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot read user"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@users.route ("/<id>" , methods=["GET"])
def get_one_user(id) :
    try:
        user = db.users.find_one({"_id":ObjectId(id)})
        user["_id"]=str(user["_id"])
        return Response(
            response = json.dumps (user,indent=4, sort_keys=True, default=str),
            status = 200 ,
            mimetype = "application/json"
        )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot read user"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################