from flask import Blueprint, request, jsonify
from datetime import datetime
from services.task_service import get_all_tasks, create_task, update_task, delete_task

task_blueprint = Blueprint('tasks', __name__)

@task_blueprint.route('/tasks', methods=['GET'])
def get_tasks():
    tasks_list = get_all_tasks()
    return jsonify(tasks_list)

@task_blueprint.route('/tasks', methods=['POST'])
def create_task_route():
    data = request.get_json()
    task, error = create_task(data)
    if error:
        return jsonify({'error': error}), 400
    return jsonify(task), 201

@task_blueprint.route('/tasks/<task_id>', methods=['PUT'])
def update_task_route(task_id):
    data = request.get_json()
    task, error = update_task(task_id, data)
    if error:
        return jsonify({'error': error}), 404
    return jsonify(task)

@task_blueprint.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task_route(task_id):
    error = delete_task(task_id)
    if error:
        return jsonify({'error': error}), 404
    return '', 204
