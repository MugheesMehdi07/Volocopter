from collections import defaultdict

from flask import request, jsonify
from app import app, db
from app.models import Mission, mission_status_dict


@app.route('/mission', methods=['POST'])
def create_mission():
    """Create a new mission and return it as a dictionary."""

    data = request.json
    new_mission = Mission(name=data['name'], description=data['description'],status=data['status'])
    db.session.add(new_mission)
    db.session.commit()

    m_dict = {
        'id': new_mission.id,
        'name': new_mission.name,
        'description': new_mission.description,
        'status': mission_status_dict[new_mission.status]
    }
    return jsonify({'message': 'Mission Created!', 'new_mission': m_dict}), 201


@app.route('/get_missions', methods=['GET'])
def get_missions():
    """
    Get all missions and return them as a list of dictionaries.
    """
    missions = Mission.query.all()

    mission_list= []
    for mission in missions:
        m_dict = {
            'id': mission.id,
            'name': mission.name,
            'description': mission.description,
            'status': mission_status_dict[mission.status]
        }

        mission_list.append(m_dict)

    return jsonify(mission_list)


@app.route('/mission/<int:id>', methods=['GET'])
def get_mission(id):
    """
    Get a mission by its id and return it as a dictionary.
    :param id:
    :return: mission_dict
    """
    mission = Mission.query.get_or_404(id)

    mission_dict = {
        'id': mission.id,
        'name': mission.name,
        'description': mission.description,
        'status': mission.status
    }

    return jsonify(mission_dict)


@app.route('/mission/<int:id>', methods=['DELETE'])
def delete_item(id):
    """
    Delete a mission by its id and return a message.
    :param id:
    :return: message
    """
    item = Mission.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'})


@app.route('/mission/<int:id>', methods=['PUT'])
def update_mission_status(id):
    """
    Update the status of a mission by its id and return a message.
    :param id:
    :return: message
    """
    data = request.json
    mission = Mission.query.get_or_404(id)
    mission.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Mission status updated!'})
