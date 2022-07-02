from flask import Blueprint
from datetime import datetime
from flask import Response, request
import pymongo
import json
from bson.objectid import ObjectId
from datetime import datetime

#products = Blueprint("products", __name__)
products= Blueprint("products",__name__)

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
   
@products.route ("/" , methods=["GET"])
def get_some_products ( ) :
    try:
        data = list(db.products.find())
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
            response = json.dumps({"message " : " cannot read products"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@products.route ("/<id>" , methods=["GET"])
def get_one_product(id) :
    try:
        product = db.products.find_one({"_id":ObjectId(id)})
        product["_id"]=str(product["_id"])
        return Response(
            response = json.dumps (product,indent=4, sort_keys=True, default=str),
            status = 200 ,
            mimetype = "application/json"
        )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot read products"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@products.route("/",methods=["POST"])
def create_product  ( ) :
    try :
        product = { 
            "name":request.form["name"],
            "price":request.form["price"],
            "unit":request.form["unit"],
            "countInStock":request.form["countInStock"],
            "imgurl":request.form["imgurl"],
            "description":request.form["description"],
            "rating":request.form["rating"],
            "category":request.form["category"],
            "date_creation":datetime.now()
        }
        dbResponse = db.products.insert_one(product)
        print( dbResponse.inserted_id )
        return Response (
            response = json.dumps(
                {"message " : " product created ",
                "id":f"{dbResponse.inserted_id}"
                },indent=4, sort_keys=True, default=str), 
            status = 200 ,
            mimetype = "application/json"
            )
    except Exception as ex :
        print ( " ************ " )
        print ( ex )
        print ( " ************ " )
#######################################
@products.route ("/<id>" , methods=["PATCH"])
def update_product (id) :
    try :
        dbResponse = db.products.update_one(
        {"_id":ObjectId(id)},
        {
            "$set":{"name":request.form["name"],
                "price":request.form["price"],
                "unit":request.form["unit"],
                "countInStock":request.form["countInStock"],
                "imgurl":request.form["imgurl"],
                "description":request.form["description"],
                "rating":request.form["rating"],
                "category":request.form["category"]},
        }
        )
        if dbResponse.modified_count== 1 :
            return Response(
            response = json.dumps(
            { "message":"product updated"}),
            status = 200 ,
            mimetype ="application/json"
            )
        else:
            return Response(
            response = json.dumps (
            { "message":"nothing to be updated!"}),
            status = 200 ,
            mimetype ="application/json"
            )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " sorry cannot update product"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@products.route ("/<id>" , methods=["DELETE"])
def delete_product (id) :
    try :
        dbResponse = db.products.delete_one({"_id":ObjectId(id)})
        if dbResponse.deleted_count==1:
            return Response(
                response = json.dumps(
                { "message":"product deleted!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
        return Response(
                response = json.dumps(
                { "message":"product not found!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
    except Exception as ex :
        print (ex)
        return Response(
            response = json.dumps({"message " : " sorry cannot Delete product"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
#juste mazelt mta3 reviews