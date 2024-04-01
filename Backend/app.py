from flask import Flask
import json
import os

app = Flask(__name__) 

if __name__ == '__main__':
    app.run(debug = True)
