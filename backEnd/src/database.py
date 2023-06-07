from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Cesar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    military = db.Column(db.Integer, nullable=False)
    users = db.relationship("User", backref="cesar", lazy=True)

    def __init__(self, email, password, military):
        self.email = email
        self.password = password
        self.military = military

    @staticmethod
    def authenticate(email, password):
        cesar = Cesar.query.filter_by(email=email).first()
        if cesar and cesar.password == password:
            return cesar
        return None


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    update_at = db.Column(db.DateTime, onupdate=datetime.now())
    cesar_id = db.Column(db.Integer, db.ForeignKey("cesar.id"), nullable=False)
    propietaUser = db.relationship(
        "PropietaUtente", backref="user", uselist=False, lazy="joined"
    )

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
    cesar_id = db.Column(db.Integer, db.ForeignKey("cesar.id"))
    kids = db.Column(db.Integer, nullable=False)

    cesar = db.relationship("Cesar", backref="propietaUtenti")

    def __repr__(self) -> str:
        return f"User>>> {self.gold}"
