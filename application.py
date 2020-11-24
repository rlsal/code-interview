from flask import Flask, request, make_response, jsonify

app = Flask(__name__)

MIN_SCORE = 9

PROVIDERS = [
  {
    "name": "Jake Chambers",
    "score": 8.9,
    "specialties": [
      "Primary Care",
      "Cardiologist"
    ],
    "availableDates": [
      {
        "from": 1571637600000,
        "to": 1571666400000
      },
      {
        "from": 1579518000000,
        "to": 1579528800000
      }
    ]
  },
  {
    "name": "Roland Deschain",
    "score": 10,
    "specialties": [
      "Neurology",
      "Cardiologist"
    ],
    "availableDates": [
      {
        "from": 1571569200000,
        "to": 1571580000000
      },
      {
        "from": 1571637600000,
        "to": 1571666400000
      }
    ]
  },
  {
    "name": "Susannah Dean",
    "score": 9.2,
    "specialties": [
      "Neuropathy"
    ],
    "availableDates": [
      {
        "from": 1571569200000,
        "to": 1571580000000
      }
    ]
  },
  {
    "name": "Eddie Dean",
    "score": 8.3,
    "specialties": [
      "Pain Assistance",
      "Internist"
    ],
    "availableDates": []
  },
  {
    "name": "Oy Midworld",
    "score": 9.5,
    "specialties": [
      "Neonatal"
    ],
    "availableDates": [
      {
        "from": 814172400000,
        "to": 1634803200000
      }
    ]
  },
  {
    "name": "Randall Flagg",
    "score": 0.1,
    "specialties": [
      "Physiologist"
    ],
    "availableDates": [
      {
        "from": 1808982000000,
        "to": 1808982000000
      }
    ]
  }
]


@app.route('/appointments', methods=['GET'])
def get_appointments():
    speciality = request.args.get('speciality')
    requested_date = request.args.get('date')
    min_score = request.args.get('minScore')

    returned_providers = []

    if not speciality or not int(requested_date):
        return make_response('Bad Request', 400)

    for provider in PROVIDERS:
        if speciality in provider['specialties'] and int(min_score) >= MIN_SCORE:
            for date in provider['availableDates']:
                if date['from'] < int(requested_date) < date['to']:
                    returned_providers.append(provider['name'])

    return make_response(jsonify(returned_providers), 200)

if __name__ == "__main__":
    app.run(debug=True)


