from flask import Blueprint
from datetime import datetime
from flask import Response, request
import pymongo
import json
from bson.objectid import ObjectId
from datetime import datetime

categories= Blueprint("categories",__name__)

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
   
@categories.route ("/" , methods=["GET"])
def get_some_categories ( ) :
    try:
        data = list(db.categories.find())
        for category in data :
            category["_id"]=str(category["_id"])
        return Response(
            response = json.dumps(data,indent=4, sort_keys=True, default=str),
            status = 200 ,
            mimetype = "application/json"
        )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot read categories"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@categories.route ("/<id>" , methods=["GET"])
def get_one_category(id) :
    try:
        category = db.categories.find_one({"_id":ObjectId(id)})
        category["_id"]=str(category["_id"])
        return Response(
            response = json.dumps (category,indent=4, sort_keys=True, default=str),
            status = 200 ,
            mimetype = "application/json"
        )
    except Exception as ex :
        print ( ex )
        return Response(
            response = json.dumps({"message " : " cannot read category"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@categories.route("/",methods=["POST"])
def create_category  ( ) :
    try :
        category = { 
            "img":request.form["img"],
            "title":request.form["title"],
            "date_creation":datetime.now()
        }
        dbResponse = db.categories.insert_one(category)
        print( dbResponse.inserted_id )
        return Response (
            response = json.dumps(
                {"message " : " category created ",
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
@categories.route ("/<id>" , methods=["PATCH"])
def update_category (id) :
    try :
        dbResponse = db.categories.update_one(
        {"_id":ObjectId(id)},
        {
            "$set":{"img":request.form["img"],
                "title":request.form["title"],
                "date_creation":datetime.now()},
        }
        )
        if dbResponse.modified_count== 1 :
            return Response(
            response = json.dumps(
            { "message":"category updated"}),
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
            response = json.dumps({"message " : " sorry cannot update category"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################
@categories.route ("/<id>" , methods=["DELETE"])
def delete_category (id) :
    try :
        dbResponse = db.categories.delete_one({"_id":ObjectId(id)})
        if dbResponse.deleted_count==1:
            return Response(
                response = json.dumps(
                { "message":"category deleted!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
        return Response(
                response = json.dumps(
                { "message":"category not found!",
                "id":f"{id}"}),
                status = 200 ,
                mimetype ="application/json"
            )
    except Exception as ex :
        print (ex)
        return Response(
            response = json.dumps({"message " : " sorry cannot Delete category"}), 
            status = 500 ,
            mimetype = "application/json"
            )
#######################################