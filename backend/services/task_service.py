from datetime import datetime

tasks = {}

def get_all_tasks():
    tasks_list = list(tasks.values())
    tasks_list.sort(key=lambda x: x['created_at'], reverse=True)
    return tasks_list

def create_task(data):
    if not data.get('title'):
        return None, 'Title is required'

    task_id = len(tasks) + 1
    current_time = datetime.utcnow().strftime('%Y-%m-%d')

    task = {
        'id': task_id,
        'title': data['title'],
        'description': data.get('description', ''),
        'status': data.get('status', 'Pending'),
        'created_at': current_time,
        'updated_at': current_time
    }

    tasks[task_id] = task
    return task, None

def update_task(task_id, data):
    task_id = int(task_id)
    if task_id not in tasks:
        return None, 'Task not found'

    task = tasks[task_id]
    task['title'] = data.get('title', task['title'])
    task['description'] = data.get('description', task['description'])
    task['status'] = data.get('status', task['status'])
    task['updated_at'] = datetime.utcnow().strftime('%Y-%m-%d')

    return task, None

def delete_task(task_id):
    task_id = int(task_id)
    if task_id not in tasks:
        return 'Task not found'

    del tasks[task_id]
    return None
