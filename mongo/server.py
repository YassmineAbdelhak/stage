from flask import Flask, session
from routes.products import products
from routes.users import users
from routes.categories import categories

app=Flask (__name__)
app.register_blueprint(products, url_prefix='/products')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(categories, url_prefix='/categories')
#######################################

if __name__ == "__main__" :
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    session.__init__(app)
    app.run ( port = 80 , debug = True )