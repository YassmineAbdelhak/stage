from flask import Flask
from requests import session
from routes.products import products
from routes.users import users

app=Flask (__name__)
app.register_blueprint(products, url_prefix='/products')
app.register_blueprint(users, url_prefix='/users')
#######################################

if __name__ == "__main__" :
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    session.__init__(app)
    app.run ( port = 80 , debug = True )