from flask import Blueprint

propietautente = Blueprint(
    "propietautente", __name__, url_prefix="/api/v1/propietautente"
)


@propietautente.get("/")
def get_all():
    return {"propietautente": []}
