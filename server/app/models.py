from app import db
from enum import Enum, unique





mission_status_dict = {
    1: "Pre-Flight",
    2: "Flight",
    3: "PostFlight"
}


class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    status = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f"Mission : {self.name} is {self.status} and {self.description}"
