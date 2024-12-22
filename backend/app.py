from flask import Flask
from flask_cors import CORS
from routes.task_routes import task_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(task_blueprint)

if __name__ == '__main__':
    app.run(debug=True)