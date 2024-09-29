from flask import Flask, render_template, request, Markup, session
import numpy as np
import pandas as pd
from utils.disease import disease_dic
from utils.fertilizer import fertilizer_dic
import requests
import config
import pickle
import io
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
import json 
from flask_mail import Mail
from flask_cors import CORS
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import execute_values
# import feedparser


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
with open('config.json','r') as c:
    params = json.load(c)["params"]

app.config.update(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = '465',
    MAIL_USE_SSL = True,
    MAIL_USERNAME = params['gmail-user'],
    MAIL_PASSWORD = params['gmail-password']
)
# mail.init_app(app)
mail = Mail(app)

# app = Flask(__name__)
with open('config.json','r') as c:
    params = json.load(c)["params"]

# DB_CONFIG = {
#     'dbname': 'sunhacks',  # Replace with your database name
#     'user': 'postgres',  # Replace with your PostgreSQL username
#     'password': 'postgres',  # Replace with your PostgreSQL password
#     'host': 'localhost',
#     'port': '5432'
# }



disease_classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']
disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes)) #resnet contains many convolutional layers
disease_model.load_state_dict(torch.load( #Uses pickle's unpickling facilities to deserialize pickled object files to memory
    disease_model_path, map_location=torch.device('cpu')))#indicates the location where all tensors should be loaded
disease_model.eval()
# load_state_dict() function takes a dictionary object
# eval() to set dropout and batch normalization layers to evaluation mode before running inference

def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label
    :params: image
    :return: prediction (string)
    """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    # Get predictions from model
    yb = model(img_u)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    # Retrieve the class label
    return prediction

@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
        # if 'file' not in request.files:
        #     return redirect(request.url)
        # file = request.files.get('file')
        # if not file:
        #     return render_template('disease.html', title=title)
        # try:
        #     img = file.read()
    files = request.files['file']
    file_bytes = files.read()
    # file = files.get('file') 

    """
      CODE TO HANDLE FILE
    """
    # jsonData = json.dumps({
    #     'success': True,
    #     'file': 'Received'
    # })
    # return data
    # return jsonData

    # data_byte = bytes(data['image'],'UTF-8')
    
    prediction = predict_image(file_bytes)
    # prediction = predict_image(data_byte)
    prediction = Markup(str(disease_dic[prediction]))
    # jsonData = json.dumps(prediction)
    return json.dumps({
        'success': True,
        'file': prediction
    })
    # jsonData = json.dumps(prediction)
    # return data
            # return render_template('disease-result.html', prediction=prediction, title=title)
        # except:
        #     pass
    # return render_template('disease.html', title=title, params = params)


with open('config.json','r') as c:
    params = json.load(c)["params"]
crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))

def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    # base_url = "http://api.openweathermap.org/data/2.5/weather?"
    base_url = "http://api.weatherapi.com/v1/current.json?"

    # complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    complete_url = base_url + "key=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    y = x["current"]

    # temperature = round((y["temp"] - 273.15), 2)
    temperature = y["temp_c"]
    humidity = y["humidity"]
    return temperature, humidity

@app.route('/contact', methods=['POST'])
def contact():
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')
    # entry = Contact(name = name , phone_num = phone , mes = mes ,date = datetime.now() ,email = email)
    # db.session.add(entry)
    # db.session.commit()
    # MAIL_DEFAULT_SENDER = email
    # msg.recipients = [params['gmail-user']]
    # msg = Mail("New message from" + name,
                    #    sender = email, 
                    #    recipients = [params['gmail-user']],
                    #    body = mes + "\n" + phone
                    #    )
    mail.send_message('New message from ' + name,
                          sender=email,
                          recipients = [params['gmail-user']],
                          body = message 
                          )
    return {"success":True}
    # return render_template('contact.html', params=params,)

# @ app.route('/crop-predict', methods=['POST'])

# def crop_prediction():
    # title = 'SoilMate'
    # data = request.json 
    # N = { 'N': data['nitrogen']}
    # return jsonData

    # # if request.method == 'POST':
       
    #     data = request.json
    #     N = int(data.nitrogen)
    #     P = int(data.phosphorous)
    #     K = int(data.potassium)
    #     ph = float(data.ph)
    #     rainfall = float(data.rainfall)
    #     city = data.city

        

    #     if weather_fetch(city) != None:
    #         temperature, humidity = weather_fetch(city)
    #         data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    #         my_prediction = crop_recommendation_model.predict(data)
    #         final_prediction = my_prediction[0]

    #         data = request.json
    #         data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    #         my_prediction = crop_recommendation_model.predict(data)
    #         final_prediction = my_prediction[0]
    #         jsonData = json.dumps(final_prediction)
    #         return jsonData
           

        # else:

        #     return "error"

@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    data = request.json
    # print("Hello")
    N = int(data['nitrogen'])
    P = int(data['phosphorous'])
    K = int(data['potassium'])
    ph = float(data['ph'])
    rainfall = float(data['rainfall'])
    city = data['city']
    # state = request.form.get("stt")
    # if weather_fetch(city) != None:
    temperature, humidity = weather_fetch(city)
    data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    my_prediction = crop_recommendation_model.predict(data)
    final_prediction = my_prediction[0]
    data = request.json
    data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    my_prediction = crop_recommendation_model.predict(data)
    final_prediction = my_prediction[0]
    jsonData = json.dumps({"result":final_prediction, "humidity":humidity,"temperature":temperature})
    return jsonData
        # return render_template('crop-result.html', prediction=final_prediction, title=title)rn jsonData
        
    # else:
    #     return {"success":False}
    
    
@ app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    title = 'SoilMate'

    data = request.json
    N = int(data['nitrogen'])
    P = int(data['phosphorous'])
    K = int(data['potassium'])
    crop_name = str(data['crop'])
    # ph = float(data['ph'])

    # crop_name = str(request.form['cropname'])
    # N = int(request.form['nitrogen'])
    # P = int(request.form['phosphorous'])
    # K = int(request.form['potassium'])
    # ph = float(request.form['ph'])

    df = pd.read_csv('data-raw/fertilizer.csv')
    # df = pd.read_csv('Data-processed/fertilizer.csv')

    nr = df[df['Crop'] == crop_name]['N'].iloc[0]
    pr = df[df['Crop'] == crop_name]['P'].iloc[0]
    kr = df[df['Crop'] == crop_name]['K'].iloc[0]

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    response = Markup(str(fertilizer_dic[key]))
    jsonData = json.dumps(response)
    return jsonData

    # return render_template('fertilizer-result.html', recommendation=response, title=title, params = params)



# def connect_db():
#     conn = psycopg2.connect(**DB_CONFIG)
#     return conn


def fetch_agriculture_updates():
    api_key = 'f2ba77ba6bd044d288f9eaf8898ef8bc'  
    url = f'https://newsapi.org/v2/everything?q=agriculture&apiKey={api_key}'

    response = requests.get(url)
    data = response.json()

    if response.status_code != 200 or data.get('status') != 'ok':
        print('Failed to fetch news from NewsAPI.')
        return []

    news_items = [
        {
            'title': article['title'],
            'link': article['url'],
            'description': article['description'] or 'No description'
        }
        for article in data['articles']
    ]

    return news_items


@app.route('/fetch-updates', methods=['GET'])
def fetch_and_store_updates():
    updates = fetch_agriculture_updates()

    if not updates:
        return jsonify({'message': 'No updates found'}), 400

    
    try:

        return jsonify({'message': 'Updates fetched and stored successfully', 'data': updates}), 200

    except Exception as e:
        print(f"Error storing data in the database: {e}")
        return jsonify({'error': str(e)}), 500

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",      # Replace with your DB host
        database="sunhacks",  # Replace with your DB name
        user="postgres",     # Replace with your DB user
        password="postgres",  # Replace with your DB password
        port = "5432"
    )
    return conn

@app.route('/contact', methods=['POST'])
def save_query():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Insert data into the PostgreSQL table
        cur.execute('''
            INSERT INTO queries (name, email, message) 
            VALUES (%s, %s, %s)
        ''', (name, email, message))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'Query saved successfully'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database connection failed'}), 500



if __name__ == '__main__':
    app.run(debug=False) 