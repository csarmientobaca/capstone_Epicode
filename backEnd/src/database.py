from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    update_at = db.Column(db.DateTime, onupdate=datetime.now())
    propietaUser = db.relationship("PropietaUtente", backref="user", uselist=False)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.propietaUser = PropietaUtente(gold=0, bestiame=0, kids=0)

    def __repr__(self) -> str:
        return f"User>>> {self.username}"


class PropietaUtente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gold = db.Column(db.Integer, nullable=False)
    bestiame = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    kids = db.Column(db.Integer, nullable=False)

    def __repr__(self) -> str:
        return f"User>>> {self.gold}"
