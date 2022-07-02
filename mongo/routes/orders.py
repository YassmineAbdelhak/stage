from flask_uuid import FlaskUUID
from flask import Blueprint, session, Response, request
import pymongo
import json
from bson.objectid import ObjectId
import bcrypt

#products = Blueprint("products", __name__)
orders= Blueprint("orders",__name__)

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
@orders.route ("/register" , methods=["POST"])
def order():